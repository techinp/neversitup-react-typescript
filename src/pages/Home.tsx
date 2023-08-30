import React, { useEffect, useState } from 'react';
import './Home.css';
import { Button, Input, List, Popconfirm, Tooltip, message } from 'antd';
import { METHOD, fetcher } from '../fetcher';
import { createTodo, getTodo, deleteTodo, updateTodo } from '../endpoints';
import ModalCreate from '../components/ModalCreate';
import { ToDoDataType, ResponseToDoType, UpdateToDoType } from '../interfaces';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

type Props = {};

const Home = (props: Props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams('get');
  const paramsId = searchParams.get('id') as string;

  const [modalOpen, setModalOpen] = useState(false);
  const [list, setList] = useState<ResponseToDoType[]>([]);
  const [loading, setLoading] = useState(false);
  const [updateItem, setUpdateItem] = useState<UpdateToDoType>({
    _id: '',
    title: '',
    description: '',
  });

  useEffect(() => {
    fetchTodoList(paramsId);
  }, [paramsId]);

  const fetchTodoList = async (id?: string) => {
    setLoading(true);
    setList([]);
    if (id) {
      const response: ResponseToDoType = await fetcher(getTodo, METHOD.GET, {
        query: id || '',
      });
      if (response._id) {
        setList([response]);
      }
    } else {
      const response: ResponseToDoType[] = await fetcher(getTodo, METHOD.GET);
      if (response.length) {
        setList(response);
      }
    }
    setLoading(false);
  };

  const createTodoList = async (values: ToDoDataType) => {
    const response = await fetcher(createTodo, METHOD.POST, { body: values });

    if (response?._id) {
      message.success('Create Todo List Success');
      setModalOpen(false);
      await fetchTodoList();
    } else {
      message.success('Something Error');
    }
  };

  const updateTodoList = async (value: UpdateToDoType) => {
    const body: ToDoDataType = {
      title: value.title,
      description: value.description,
    };

    await fetcher(updateTodo, METHOD.PUT, {
      body,
      query: value._id,
    });

    setModalOpen(false);

    await fetchTodoList(paramsId);
  };

  const deleteTodoList = async (value: ResponseToDoType) => {
    await fetcher(deleteTodo, METHOD.DELETE, {
      query: value._id,
    });
    message.success(`Delete "${value.title}" Success`);
    navigate('/');
  };

  const onSearchTitle = async (value: string) => {
    if (value) {
      const response: ResponseToDoType[] = await fetcher(getTodo, METHOD.GET);
      const item = response.find((item) => item.title === value);
      if (item?._id) navigate(`/search?id=${item?._id}`);
      else message.error('Item not found');
    } else navigate('/');
  };

  const handlerModal = (open: boolean) => {
    setUpdateItem({
      _id: '',
      title: '',
      description: '',
    });
    setModalOpen(open);
  };

  return (
    <>
      <ModalCreate
        open={modalOpen}
        onClose={handlerModal}
        onSubmit={createTodoList}
        onUpdate={updateTodoList}
        updateItem={updateItem}
      />
      <section className='lg:w-3/5 md:w-4/5 w-full mx-auto'>
        <section className='mt-16'>
          <section className='flex md:flex-row flex-col gap-4 justify-between items-start'>
            <section>
              <Input.Search
                placeholder='Title'
                enterButton
                allowClear
                onSearch={(value) => {
                  onSearchTitle(value.trim());
                }}
              />
              <div className='text-left mt-1'>
                <small className='text-gray-500'>
                  *การ search ไม่ใช้การ filter แต่เป็นการค้นหา item
                  หนึ่งรายการจาก _id
                </small>
              </div>
            </section>
            <section className='flex gap-4 items-center'>
              <Button onClick={() => navigate('/')}>Get All</Button>
              <Button onClick={() => fetchTodoList(paramsId)}>Refresh</Button>
              <Button
                onClick={() => {
                  setUpdateItem({
                    _id: '',
                    title: '',
                    description: '',
                  });
                  setModalOpen(true);
                }}
                type='primary'
              >
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
                      <div className='text-lg'>
                        Title: {item.title}{' '}
                        <span className='text-sm text-gray-500'>
                          (_id: {item._id})
                        </span>
                      </div>
                      <div className=''>
                        <Tooltip title='edit'>
                          <Button
                            type='text'
                            shape='circle'
                            onClick={() => {
                              setUpdateItem({
                                _id: item._id,
                                title: item.title,
                                description: item.description,
                              });
                              setModalOpen(true);
                            }}
                            icon={<EditOutlined />}
                          />
                        </Tooltip>

                        <Popconfirm
                          title={`Delete "${item.title}"`}
                          description='Are you sure to delete this item?'
                          onConfirm={() => deleteTodoList(item)}
                          okText='Yes'
                          cancelText='No'
                        >
                          <Tooltip title='delete'>
                            <Button
                              type='text'
                              danger
                              shape='circle'
                              icon={<DeleteOutlined />}
                            />
                          </Tooltip>
                        </Popconfirm>
                      </div>
                    </section>
                  }
                  description={
                    <section>
                      <section className='text-left'>
                        <div>Description: </div>
                        <div>{item.description}</div>
                      </section>
                      <div className='flex justify-end gap-4 text-xs'>
                        <span>
                          created:{' '}
                          {new Date(item.createdAt).toLocaleString('th')}
                        </span>
                        {item.createdAt !== item.updatedAt && (
                          <span>
                            updated:{' '}
                            {new Date(item.updatedAt).toLocaleString('th')}
                          </span>
                        )}
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
