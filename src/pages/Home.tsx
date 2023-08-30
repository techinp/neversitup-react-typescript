import React, { useEffect, useState } from 'react';
import './Home.css';
import {
  Avatar,
  Button,
  Form,
  Input,
  List,
  Skeleton,
  Tooltip,
  message,
} from 'antd';
import { METHOD, fetcher } from '../fetcher';
import { createTodo, getTodo } from '../endpoints';
import ModalCreate from '../components/ModalCreate';
import { ToDoDataType, ResponseToDoType } from '../interfaces';
import { useSearchParams } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

type Props = {};

const Home = (props: Props) => {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();

  const [modalOpen, setModalOpen] = useState(false);
  const [list, setList] = useState<ResponseToDoType[]>([]);
  const [loading, setLoading] = useState(false);

  console.log('searchParams :', searchParams.get('id'));

  const fetchTodoList = async () => {
    setLoading(true);
    const response: ResponseToDoType[] = await fetcher(getTodo, METHOD.GET);
    console.log('response :', response);
    if (response.length) {
      setList(response);
    } else {
      setList([]);
    }
    setLoading(false);
  };

  const createTodoList = async (values: ToDoDataType) => {
    const response = await fetcher(createTodo, METHOD.POST, { body: values });

    if (response?._id) {
      message.success('Create Todo List Success');
      form.resetFields();
      setModalOpen(false);
      await fetchTodoList();
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
        <section className='mt-16'>
          <section className='flex justify-between items-center'>
            <section>
              <Input.Search
                placeholder='Search'
                enterButton
                allowClear
                onSearch={(value) => {
                  console.log('value', value);
                }}
              />
            </section>
            <section className='flex gap-4 items-center'>
              <Button onClick={() => fetchTodoList()}>Refresh</Button>
              <Button onClick={() => setModalOpen(true)} type='primary'>
                Create
              </Button>
            </section>
          </section>
        </section>
        <section className='home-list-box'>
          <List
            loading={loading}
            itemLayout='horizontal'
            dataSource={list}
            renderItem={(item: ResponseToDoType, index: number) => (
              <List.Item className='home-list-item'>
                <List.Item.Meta
                  title={
                    <section className='flex justify-between items-center'>
                      <div className='text-lg'>{item.title}</div>
                      <div className=''>
                        <Tooltip title='edit'>
                          <Button
                            type='text'
                            shape='circle'
                            icon={<EditOutlined />}
                          />
                        </Tooltip>
                        <Tooltip title='delete'>
                          <Button
                            type='text'
                            danger
                            shape='circle'
                            icon={<DeleteOutlined />}
                          />
                        </Tooltip>
                      </div>
                    </section>
                  }
                  description={
                    <section>
                      <div className='text-left'>{item.description}</div>
                      <div className='flex justify-end gap-4 text-xs'>
                        <span>
                          created:{' '}
                          {new Date(item.createdAt).toLocaleString('th')}
                        </span>
                        {/* {item.createdAt != item.updatedAt && ( */}
                        <span>
                          updated:{' '}
                          {new Date(item.createdAt).toLocaleString('th')}
                        </span>
                        {/* )} */}
                      </div>
                    </section>
                  }
                />
              </List.Item>
            )}
          />
        </section>
      </section>
    </>
  );
};

export default Home;
