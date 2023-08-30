import { Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react';
import { ToDoDataType, UpdateToDoType } from '../interfaces';

type Props = {
  open: boolean;
  onClose: (open: boolean) => void;
  onSubmit: (data: ToDoDataType) => void;
  onUpdate: (data: UpdateToDoType) => void;
  updateItem?: UpdateToDoType;
};

const ModalCreate = ({
  open,
  onClose,
  onSubmit,
  updateItem,
  onUpdate,
}: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      title: updateItem?.title,
      description: updateItem?.description,
    });
  });

  return (
    <Modal
      open={open}
      title={
        updateItem?._id
          ? `Update ${updateItem.title}`
          : 'Create a new todo list'
      }
      okText={updateItem?._id ? 'Update' : 'Create'}
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
            if (updateItem?.title && updateItem.description) {
              onUpdate({
                _id: updateItem._id,
                ...values,
              });
            } else {
              onSubmit(values);
            }
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
        initialValues={{
          title: updateItem?.title,
          description: updateItem?.description,
        }}
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
