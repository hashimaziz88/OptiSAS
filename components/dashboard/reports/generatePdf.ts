import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  IOpportunityReportItemDto,
  ISalesByPeriodItemDto,
} from "@/providers/reportProvider/context";
import { OPPORTUNITY_STAGE_LABELS } from "@/constants/opportunities";
import { formatCurrency } from "./utils";

const BRAND_COLOR: [number, number, number] = [99, 102, 241]; // #6366f1
const HEADER_TEXT: [number, number, number] = [255, 255, 255];
const DARK_BG: [number, number, number] = [15, 23, 42]; // #0f172a
const LIGHT_ROW: [number, number, number] = [241, 245, 249]; // #f1f5f9
const TEXT_DARK: [number, number, number] = [15, 23, 42];
const TEXT_MID: [number, number, number] = [71, 85, 105];

function addPageHeader(doc: jsPDF, title: string) {
  const pageWidth = doc.internal.pageSize.getWidth();

  // Dark header band
  doc.setFillColor(...DARK_BG);
  doc.rect(0, 0, pageWidth, 28, "F");

  // Accent stripe
  doc.setFillColor(...BRAND_COLOR);
  doc.rect(0, 28, pageWidth, 4, "F");

  // Company name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...HEADER_TEXT);
  doc.text("OptiSAS — Sales Automation System", 14, 12);

  // Report title
  doc.setFontSize(18);
  doc.text(title, 14, 22);

  // Generated timestamp
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184); // slate-400
  const now = new Date().toLocaleString("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  doc.text(`Generated: ${now}`, pageWidth - 14, 22, { align: "right" });
}

function addPageFooter(doc: jsPDF) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const totalPages = (
    doc.internal as unknown as { getNumberOfPages: () => number }
  ).getNumberOfPages();

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFillColor(...DARK_BG);
    doc.rect(0, pageHeight - 10, pageWidth, 10, "F");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text("Confidential — Internal Use Only", 14, pageHeight - 3);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - 14, pageHeight - 3, {
      align: "right",
    });
  }
}

function addFiltersSection(
  doc: jsPDF,
  filters: Record<string, string>,
  startY: number,
): number {
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFillColor(248, 250, 252); // slate-50
  doc.roundedRect(14, startY, pageWidth - 28, 16, 2, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...TEXT_MID);
  doc.text("Filters applied:", 18, startY + 6);

  doc.setFont("helvetica", "normal");
  let x = 55;
  Object.entries(filters).forEach(([key, val]) => {
    const txt = `${key}: ${val}`;
    doc.setTextColor(...TEXT_DARK);
    doc.text(txt, x, startY + 6);
    x += doc.getTextWidth(txt) + 12;
  });

  return startY + 22;
}

function addStatCards(
  doc: jsPDF,
  stats: { label: string; value: string; accent?: boolean }[],
  startY: number,
): number {
  const pageWidth = doc.internal.pageSize.getWidth();
  const cardW = (pageWidth - 28 - (stats.length - 1) * 6) / stats.length;
  const cardH = 22;

  stats.forEach((stat, i) => {
    const x = 14 + i * (cardW + 6);

    if (stat.accent) {
      doc.setFillColor(...BRAND_COLOR);
    } else {
      doc.setFillColor(248, 250, 252);
    }
    doc.roundedRect(x, startY, cardW, cardH, 2, 2, "F");

    // Label
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(
      stat.accent ? 200 : 100,
      stat.accent ? 210 : 116,
      stat.accent ? 255 : 139,
    );
    doc.text(stat.label, x + cardW / 2, startY + 7, { align: "center" });

    // Value
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(
      stat.accent ? 255 : 15,
      stat.accent ? 255 : 23,
      stat.accent ? 255 : 42,
    );
    doc.text(stat.value, x + cardW / 2, startY + 17, { align: "center" });
  });

  return startY + cardH + 8;
}

export function generateOpportunitiesReportPdf(
  rows: IOpportunityReportItemDto[],
  filters: { dateRange?: string; stage?: string; client?: string },
) {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

  addPageHeader(doc, "Opportunities Report");

  let y = 38;

  // Filters
  const filterMap: Record<string, string> = {
    "Date Range": filters.dateRange ?? "All time",
    Stage: filters.stage ?? "All stages",
    Client: filters.client ?? "All clients",
  };
  y = addFiltersSection(doc, filterMap, y);

  // Stats
  const totalValue = rows.reduce((s, r) => s + (r.estimatedValue ?? 0), 0);
  const avgDeal = rows.length ? totalValue / rows.length : 0;
  const wonCount = rows.filter((r) => r.stage === 5).length;
  const lostCount = rows.filter((r) => r.stage === 6).length;

  y = addStatCards(
    doc,
    [
      { label: "Total Opportunities", value: String(rows.length) },
      {
        label: "Total Est. Value",
        value: formatCurrency(totalValue),
        accent: true,
      },
      { label: "Avg. Deal Size", value: formatCurrency(avgDeal) },
      { label: "Won", value: String(wonCount) },
      { label: "Lost", value: String(lostCount) },
    ],
    y,
  );

  // Table
  autoTable(doc, {
    startY: y,
    head: [
      [
        "Opportunity",
        "Client",
        "Owner",
        "Stage",
        "Est. Value",
        "Expected Close",
        "Created",
      ],
    ],
    body: rows.map((r) => [
      r.title ?? "",
      r.clientName ?? "",
      r.ownerName ?? "",
      OPPORTUNITY_STAGE_LABELS[r.stage] ?? String(r.stage),
      formatCurrency(r.estimatedValue),
      r.expectedCloseDate
        ? new Date(r.expectedCloseDate).toLocaleDateString("en-ZA")
        : "—",
      r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-ZA") : "—",
    ]),
    headStyles: {
      fillColor: BRAND_COLOR,
      textColor: HEADER_TEXT,
      fontStyle: "bold",
      fontSize: 8,
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: TEXT_DARK,
    },
    alternateRowStyles: { fillColor: LIGHT_ROW },
    columnStyles: {
      0: { cellWidth: 50 },
      4: { halign: "right" },
      5: { halign: "center" },
      6: { halign: "center" },
    },
    margin: { left: 14, right: 14 },
    tableLineColor: [226, 232, 240],
    tableLineWidth: 0.1,
  });

  addPageFooter(doc);

  const filename = `opportunities-report-${new Date().toISOString().split("T")[0]}.pdf`;
  doc.save(filename);
}

export function generateSalesByPeriodReportPdf(
  rows: ISalesByPeriodItemDto[],
  filters: { dateRange?: string; groupBy?: string },
) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  addPageHeader(doc, "Sales by Period Report");

  let y = 38;

  // Filters
  const filterMap: Record<string, string> = {
    "Date Range": filters.dateRange ?? "All time",
    "Group By": filters.groupBy ?? "Month",
  };
  y = addFiltersSection(doc, filterMap, y);

  // Stats
  const totalPipeline = rows.reduce((s, r) => s + (r.totalValue ?? 0), 0);
  const totalWonRevenue = rows.reduce((s, r) => s + (r.wonValue ?? 0), 0);
  const totalWonDeals = rows.reduce((s, r) => s + (r.wonCount ?? 0), 0);
  const avgWinRate =
    rows.length
      ? rows.reduce((s, r) => s + (r.winRate ?? 0), 0) / rows.length
      : 0;

  y = addStatCards(
    doc,
    [
      { label: "Periods", value: String(rows.length) },
      {
        label: "Pipeline Value",
        value: formatCurrency(totalPipeline),
        accent: true,
      },
      { label: "Won Revenue", value: formatCurrency(totalWonRevenue) },
      { label: "Won Deals", value: String(totalWonDeals) },
      { label: "Avg Win Rate", value: `${avgWinRate.toFixed(1)}%` },
    ],
    y,
  );

  // Bar chart section
  if (rows.length > 0) {
    const maxVal = Math.max(...rows.map((r) => r.totalValue ?? 0));
    const chartX = 14;
    const chartW = doc.internal.pageSize.getWidth() - 28;
    const barH = 6;
    const gap = 3;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...TEXT_DARK);
    doc.text(`Revenue by ${filters.groupBy ?? "Month"}`, chartX, y);
    y += 5;

    rows.slice(0, 12).forEach((r) => {
      const totalPct = maxVal > 0 ? (r.totalValue ?? 0) / maxVal : 0;
      const wonPct =
        r.totalValue > 0 ? (r.wonValue ?? 0) / r.totalValue : 0;
      const labelW = 30;
      const valueW = 52;
      const barAreaW = chartW - labelW - valueW;

      // Period label
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(...TEXT_MID);
      doc.text(r.periodName ?? "", chartX, y + barH - 1, {
        maxWidth: labelW - 2,
      });

      // Track background
      doc.setFillColor(226, 232, 240);
      doc.roundedRect(chartX + labelW, y, barAreaW, barH, 1, 1, "F");

      // Pipeline bar (semi-transparent brand color)
      if (totalPct > 0) {
        doc.setFillColor(...BRAND_COLOR);
        doc.roundedRect(
          chartX + labelW,
          y,
          barAreaW * totalPct,
          barH,
          1,
          1,
          "F",
        );
      }

      // Won revenue bar (green, proportional to won/total)
      if (wonPct > 0 && totalPct > 0) {
        doc.setFillColor(34, 197, 94); // #22c55e
        doc.roundedRect(
          chartX + labelW,
          y,
          barAreaW * totalPct * wonPct,
          barH,
          1,
          1,
          "F",
        );
      }

      // Value label
      doc.setTextColor(...TEXT_DARK);
      doc.text(
        `${formatCurrency(r.wonValue)} · ${r.winRate.toFixed(1)}%`,
        chartX + labelW + barAreaW + 2,
        y + barH - 1,
      );

      y += barH + gap;
    });

    y += 4;
  }

  // Table
  autoTable(doc, {
    startY: y,
    head: [
      ["Period", "Opps", "Won", "Lost", "Win Rate", "Won Revenue", "Pipeline"],
    ],
    body: rows.map((r) => [
      r.periodName ?? "",
      String(r.opportunitiesCount ?? 0),
      String(r.wonCount ?? 0),
      String(r.lostCount ?? 0),
      `${r.winRate.toFixed(1)}%`,
      formatCurrency(r.wonValue),
      formatCurrency(r.totalValue),
    ]),
    headStyles: {
      fillColor: BRAND_COLOR,
      textColor: HEADER_TEXT,
      fontStyle: "bold",
      fontSize: 9,
    },
    bodyStyles: {
      fontSize: 8.5,
      textColor: TEXT_DARK,
    },
    alternateRowStyles: { fillColor: LIGHT_ROW },
    columnStyles: {
      1: { halign: "center" },
      2: { halign: "center" },
      3: { halign: "center" },
      4: { halign: "center" },
      5: { halign: "right" },
      6: { halign: "right" },
    },
    margin: { left: 14, right: 14 },
    tableLineColor: [226, 232, 240],
    tableLineWidth: 0.1,
  });

  addPageFooter(doc);

  const filename = `sales-by-period-report-${new Date().toISOString().split("T")[0]}.pdf`;
  doc.save(filename);
}
