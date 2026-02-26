'use client';

import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Select, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile, RcFile } from 'antd/es/upload';
import {
    DOCUMENT_CATEGORY_OPTIONS,
    RELATED_TO_TYPE_OPTIONS,
} from '@/constants/documents';
import { axiosInstance } from '@/utils/axiosInstance';
import { modalStyles, useStyles } from './style/style';

const { Dragger } = Upload;

const BASE_URL = process.env.NEXT_PUBLIC_API_LINK;

const RELATED_ENDPOINTS: Record<number, string> = {
    1: '/api/Clients',
    2: '/api/Opportunities',
    3: '/api/Proposals',
    4: '/api/Contracts',
    5: '/api/Activities',
};

const getRecordLabel = (type: number, record: Record<string, unknown>): string => {
    if (type === 1) return (record.name as string) ?? String(record.id);
    return (
        (record.title as string) ??
        (record.subject as string) ??
        (record.proposalNumber as string) ??
        (record.contractNumber as string) ??
        String(record.id)
    );
};

interface DocumentUploadModalProps {
    open: boolean;
    loading: boolean;
    onUpload: (formData: FormData) => Promise<void>;
    onClose: () => void;
}

const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({
    open,
    loading,
    onUpload,
    onClose,
}) => {
    const { styles } = useStyles();
    const [form] = Form.useForm();

    const [relatedType, setRelatedType] = useState<number | undefined>(undefined);
    const [relatedOptions, setRelatedOptions] = useState<{ value: string; label: string }[]>([]);
    const [relatedLoading, setRelatedLoading] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {
        if (!open) {
            form.resetFields();
            setFileList([]);
            setRelatedType(undefined);
            setRelatedOptions([]);
        }
    }, [open, form]);

    const fetchRelatedRecords = async (type: number) => {
        setRelatedOptions([]);
        setRelatedLoading(true);
        try {
            const res = await axiosInstance().get(`${BASE_URL}${RELATED_ENDPOINTS[type]}`, {
                params: { pageNumber: 1, pageSize: 100 },
            });
            const items: Record<string, unknown>[] = res.data?.items ?? res.data ?? [];
            setRelatedOptions(
                items.map((item) => ({
                    value: item.id as string,
                    label: getRecordLabel(type, item),
                }))
            );
        } catch {
            message.error('Failed to load related records');
        } finally {
            setRelatedLoading(false);
        }
    };

    const handleTypeChange = (value: number) => {
        setRelatedType(value);
        form.setFieldValue('relatedToId', undefined);
        fetchRelatedRecords(value);
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            if (fileList.length === 0) {
                message.error('Please select a file to upload');
                return;
            }
            const file = fileList[0].originFileObj as RcFile;
            const formData = new FormData();
            formData.append('file', file);
            formData.append('category', String(values.category));
            formData.append('relatedToType', String(values.relatedToType));
            formData.append('relatedToId', String(values.relatedToId));
            if (values.description) {
                formData.append('description', values.description);
            }
            await onUpload(formData);
        } catch {
            // validation failed
        }
    };

    return (
        <Modal
            open={open}
            title="Upload Document"
            onCancel={onClose}
            footer={null}
            className={styles.modal}
            styles={modalStyles}
            destroyOnHidden
            width={520}
        >
            <div className={styles.formBody}>
                <Form form={form} layout="vertical" requiredMark={false}>
                    <Form.Item label="File" required>
                        <Dragger
                            fileList={fileList}
                            maxCount={1}
                            beforeUpload={(file) => {
                                setFileList([{ ...file, originFileObj: file, uid: file.uid, name: file.name, status: 'done' }]);
                                return false;
                            }}
                            onRemove={() => setFileList([])}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area</p>
                            <p className="ant-upload-hint">Max file size: 50MB</p>
                        </Dragger>
                    </Form.Item>

                    <Form.Item
                        name="category"
                        label="Category"
                        rules={[{ required: true, message: 'Please select a category' }]}
                    >
                        <Select
                            placeholder="Select category"
                            options={DOCUMENT_CATEGORY_OPTIONS}
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="relatedToType"
                        label="Related To Type"
                        rules={[{ required: true, message: 'Please select a related type' }]}
                    >
                        <Select
                            placeholder="Select type"
                            options={RELATED_TO_TYPE_OPTIONS}
                            onChange={handleTypeChange}
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="relatedToId"
                        label="Related Record"
                        rules={[{ required: true, message: 'Please select a related record' }]}
                    >
                        <Select
                            placeholder={relatedType ? 'Select record' : 'Select a type first'}
                            options={relatedOptions}
                            loading={relatedLoading}
                            disabled={!relatedType}
                            showSearch
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item name="description" label="Description">
                        <Input.TextArea
                            placeholder="Optional description..."
                            rows={3}
                            size="large"
                        />
                    </Form.Item>

                    <Button
                        type="primary"
                        className={styles.submitButton}
                        loading={loading}
                        onClick={handleSubmit}
                    >
                        Upload Document
                    </Button>
                </Form>
            </div>
        </Modal>
    );
};

export default DocumentUploadModal;
