'use client';

import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Select, Switch } from 'antd';
import { ICreateNoteDto, INoteDto, IUpdateNoteDto } from '@/providers/noteProvider/context';
import { RELATED_TO_TYPE_OPTIONS } from '@/constants/notes';
import { axiosInstance } from '@/utils/axiosInstance';
import { useStyles } from './style/style';

const BASE_URL = process.env.NEXT_PUBLIC_API_LINK;

const RELATED_ENDPOINTS: Record<number, string> = {
    1: '/api/Clients',
    2: '/api/Opportunities',
    3: '/api/Proposals',
    4: '/api/Contracts',
    5: '/api/Activities',
};

const getRecordLabel = (type: number, record: Record<string, string>): string => {
    if (type === 1) return record.name;
    return record.title ?? record.subject ?? record.proposalNumber ?? record.contractNumber ?? record.id;
};

interface NoteFormModalProps {
    open: boolean;
    editing?: INoteDto | null;
    loading: boolean;
    onSubmit: (values: ICreateNoteDto | IUpdateNoteDto) => void;
    onClose: () => void;
}

const NoteFormModal: React.FC<NoteFormModalProps> = ({ open, editing, loading, onSubmit, onClose }) => {
    const { styles } = useStyles();
    const [form] = Form.useForm();
    const [relatedType, setRelatedType] = useState<number | undefined>(undefined);
    const [relatedOptions, setRelatedOptions] = useState<{ value: string; label: string }[]>([]);
    const [relatedLoading, setRelatedLoading] = useState(false);

    const fetchRelatedRecords = async (type: number) => {
        setRelatedLoading(true);
        setRelatedOptions([]);
        try {
            const res = await axiosInstance().get(`${BASE_URL}${RELATED_ENDPOINTS[type]}`, {
                params: { pageNumber: 1, pageSize: 100 },
            });
            const items: Record<string, string>[] = res.data?.items ?? res.data ?? [];
            setRelatedOptions(items.map((item) => ({ value: item.id, label: getRecordLabel(type, item) })));
        } catch {
            setRelatedOptions([]);
        } finally {
            setRelatedLoading(false);
        }
    };

    const handleRelatedTypeChange = (value: number | undefined) => {
        setRelatedType(value);
        form.setFieldValue('relatedToId', undefined);
        if (value) fetchRelatedRecords(value);
        else setRelatedOptions([]);
    };

    useEffect(() => {
        if (!open) return;

        if (editing) {
            form.setFieldsValue({
                content: editing.content,
                isPrivate: editing.isPrivate,
                relatedToType: editing.relatedToType,
                relatedToId: editing.relatedToId,
            });
            setRelatedType(editing.relatedToType);
            fetchRelatedRecords(editing.relatedToType);
        } else {
            form.resetFields();
            form.setFieldsValue({ isPrivate: false });
            setRelatedType(undefined);
            setRelatedOptions([]);
        }
    }, [open, editing, form]);

    return (
        <Modal
            open={open}
            title={editing ? 'Edit Note' : 'Add Note'}
            onCancel={onClose}
            footer={null}
            width={580}
            destroyOnHidden
            classNames={{ body: styles.modalBody, container: styles.modalContainer, header: styles.modalHeader }}
        >
            <div className={styles.formBody}>
                <Form form={form} layout="vertical" requiredMark={false} onFinish={onSubmit}>
                    <Form.Item
                        label="Content"
                        name="content"
                        rules={[{ required: true, message: 'Please enter note content' }]}
                    >
                        <Input.TextArea rows={5} placeholder="Write your note..." style={{ resize: 'none' }} />
                    </Form.Item>

                    <Form.Item
                        label="Related To Type"
                        name="relatedToType"
                        rules={[{ required: true, message: 'Please choose a related type' }]}
                    >
                        <Select
                            size="large"
                            options={RELATED_TO_TYPE_OPTIONS}
                            placeholder="Select related type"
                            onChange={handleRelatedTypeChange}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Related Record"
                        name="relatedToId"
                        rules={[{ required: true, message: 'Please choose a related record' }]}
                    >
                        <Select
                            size="large"
                            showSearch
                            placeholder={relatedType ? 'Search and select a record' : 'Select type first'}
                            disabled={!relatedType}
                            loading={relatedLoading}
                            options={relatedOptions}
                            notFoundContent={relatedLoading ? 'Loading...' : 'No records found'}
                        />
                    </Form.Item>

                    <Form.Item label="Private Note" name="isPrivate" valuePropName="checked">
                        <Switch />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className={styles.submitButton}
                            size="large"
                        >
                            {editing ? 'Save Changes' : 'Create Note'}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default NoteFormModal;
