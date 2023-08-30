import { Button, Form, Input, Modal } from 'antd';
import React from 'react';
import { TodoDataType } from '../interfaces';

type Props = {
  open: boolean;
  onClose: (open: boolean) => void;
  onSubmit: (data: TodoDataType) => void;
};

const ModalCreate = ({ open, onClose, onSubmit }: Props) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      title='Create a new todo list'
      okText='Create'
      cancelText='Cancel'
      onCancel={() => {
        onClose(false);
        form.resetFields();
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onSubmit(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout='vertical'
        name='form_modal_create'
        initialValues={{ title: '', description: '' }}
      >
        <Form.Item
          label='Title'
          name='title'
          required
          rules={[
            {
              type: 'string',
              required: true,
            },
          ]}
        >
          <Input placeholder='Title' />
        </Form.Item>
        <Form.Item
          label='Description'
          name='description'
          required
          rules={[
            {
              type: 'string',
              required: true,
            },
          ]}
        >
          <Input.TextArea placeholder='Description' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCreate;
