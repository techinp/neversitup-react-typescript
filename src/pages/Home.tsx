import React, { useEffect, useState } from 'react';
import { Avatar, Button, Form, Input, List, Skeleton, message } from 'antd';
import { METHOD, fetcher } from '../fetcher';
import { createTodo, getTodo } from '../endpoints';
import ModalCreate from '../components/ModalCreate';
import { TodoDataType } from '../interfaces';

type Props = {};

interface DataType {
  gender?: string;
  name: {
    title?: string;
    first?: string;
    last?: string;
  };
  email?: string;
  picture: {
    large?: string;
    medium?: string;
    thumbnail?: string;
  };
  nat?: string;
  loading: boolean;
}

const count = 50;

const Home = (props: Props) => {
  const [form] = Form.useForm();
  const [modalOpen, setModalOpen] = useState(false);

  const fetchTodoList = async () => {
    const response = await fetcher(getTodo, METHOD.GET);
    console.log('response :', response);
  };

  const createTodoList = async (values: TodoDataType) => {
    console.log('values :', values);
    const response = await fetcher(createTodo, METHOD.POST, { body: values });

    if (response?._id) {
      message.success('Create Todo List Success');
      form.resetFields();
    } else {
      message.success('Something Error');
    }
  };

  const handlerModal = (open: boolean) => {
    setModalOpen(open);
  };

  return (
    <>
      <ModalCreate
        open={modalOpen}
        onClose={handlerModal}
        onSubmit={createTodoList}
      />
      <section className='lg:w-3/5 md:w-4/5 w-full mx-auto'>
        <section className='mt-4'>
          <Button onClick={() => fetchTodoList()}>Load</Button>
          <Button onClick={() => setModalOpen(true)}>Open</Button>
        </section>
      </section>
    </>
  );
};

export default Home;
