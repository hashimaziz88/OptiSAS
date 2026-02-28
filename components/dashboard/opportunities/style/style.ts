import { createStyles, css } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
  modalContainer: css`
    background: #1e2128;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 0;
  `,

  modalHeader: css`
    background: transparent;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding: 20px 24px;
    margin-bottom: 0;
  `,

  modalBody: css`
    padding: 24px;
  `,

  pageHeader: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  `,

  pageTitle: css`
    &.ant-typography {
      color: white;
      margin: 0;
      font-size: 24px;
      font-weight: 700;
    }
  `,

  pipelineRow: css`
    margin-bottom: 24px;
  `,

  pipelineCard: css`
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    overflow: hidden;
    transition: border-color 0.2s;

    &:hover {
      border-color: rgba(255, 255, 255, 0.2);
    }

    @media (max-width: 576px) {
      padding: 10px 8px;
    }
  `,

  pipelineCardLabel: css`
    font-size: 12px;
    color: #8c8c8c;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    .ant-tag {
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: block;

      @media (max-width: 576px) {
        font-size: 10px;
        padding: 0 4px;
      }
    }
  `,

  pipelineCardCount: css`
    font-size: 28px;
    font-weight: 700;
    color: white;
    line-height: 1.2;

    @media (max-width: 576px) {
      font-size: 20px;
    }
  `,

  pipelineCardValue: css`
    font-size: 12px;
    color: #a0aec0;
    margin-top: 2px;
  `,

  filterBar: css`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 20px;
    align-items: center;
  `,

  searchInput: css`
    max-width: 260px;
    background: rgba(255, 255, 255, 0.05) !important;
    border-color: rgba(255, 255, 255, 0.12);
    color: white;

    &:hover,
    &:focus-within {
      border-color: ${token.colorPrimary};
      background: rgba(255, 255, 255, 0.05) !important;
    }
  `,

  filterSelect: css`
    min-width: 170px;

    &:hover .ant-select-selector,
    &.ant-select-focused .ant-select-selector {
      border-color: ${token.colorPrimary} !important;
    }
  `,

  table: css``,

  stageBadge: css`
    display: inline-block;
    padding: 2px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
  `,

  modal: css``,

  formBody: css`
    padding-top: 8px;
  `,

  formRow: css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 16px;
  `,

  formFooter: css`
    margin-bottom: 0;
    margin-top: 8px;
  `,

  formFooterActions: css`
    display: flex;
    gap: 8px;
    justify-content: flex-end;
  `,

  refreshButton: css`
    color: #8c8c8c;
    border-color: rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.05);
  `,

  drawerHeader: css``,

  drawerBody: css`
    .ant-timeline-item-content {
      color: #e2e8f0;
    }

    .ant-timeline-item-tail {
      border-color: rgba(255, 255, 255, 0.1);
    }
  `,

  drawerActions: css`
    margin-top: 24px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  `,

  sectionTitle: css`
    color: #8c8c8c;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin: 20px 0 10px;
  `,

  stageHistoryItem: css`
    font-size: 13px;
  `,

  stageHistoryTime: css`
    font-size: 11px;
    color: #8c8c8c;
    margin-top: 2px;
  `,

  probabilityText: css`
    color: #a0aec0;
    font-size: 13px;
  `,

  valueText: css`
    font-weight: 600;
    color: #e2e8f0;
  `,

  viewAction: css`
    color: #60a5fa;
  `,

  editAction: css`
    color: #facc15;
  `,

  deleteAction: css`
    color: #f87171;
  `,

  opportunityNameLink: css`
    padding: 0;
    color: #60a5fa;
    font-weight: 600;
    text-align: left;
    height: auto;
    white-space: normal;
  `,

  fullWidth: css`
    width: 100%;
  `,

  stageTagSmall: css`
    margin: 0;
    font-size: 11px;
  `,

  stageTagKanban: css`
    margin-bottom: 16px;
    font-size: 13px;
    padding: 2px 12px;
  `,

  kanbanCardText: css`
    color: #e2e8f0;
  `,

  kanbanTagSmall: css`
    font-size: 11px;
  `,

  historyNoteText: css`
    color: #a0aec0;
    font-size: 12px;
    margin-top: 2px;
  `,

  statusBadge: css`
    display: inline-block;
    padding: 2px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
  `,

  activeBadge: css`
    background: rgba(82, 196, 26, 0.15);
    color: #52c41a;
    border: 1px solid rgba(82, 196, 26, 0.3);
  `,

  inactiveBadge: css`
    background: rgba(255, 77, 79, 0.15);
    color: #ff4d4f;
    border: 1px solid rgba(255, 77, 79, 0.3);
  `,

  activateAction: css`
    color: #34d399;
  `,
}));
