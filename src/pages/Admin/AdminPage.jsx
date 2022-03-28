import { useState, useEffect } from "react";
import axios from "axios";
import { AdminNavigation } from "./../../components/navigationAdmin";
import "./AdminPage.css";
import {
  Tabs,
  Table,
  Popconfirm,
  Button,
  Input,
  Form,
  Typography,
  DatePicker,
} from "antd";
import { host } from "../../routes";
import { AdminOrder } from "../../components/Catalog/AdminOrder";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const EditableCategoryTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  useEffect(() => {
    axios.get(host + "api/Category/GetAll").then((resp) => {
      setData(resp.data);
    });
  }, []);
  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const edit_id = (id) => {
    setEditingKey(id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);

      if (id !== 0) axios.put(host + `api/Category/Put`, { id, ...row });
      else axios.post(host + `api/Category/Post`, row);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const handleDeleteCategory = (id) => {
    axios.delete(host + `api/Category/Delete?entity=${id}`);
    setData(data.filter((item) => item.id !== id));
  };
  const columns = [
    {
      title: "Идентефикатор",
      dataIndex: "id",
      editable: false,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Название",
      dataIndex: "name",
      editable: true,
    },
    {
      title: "Редактировать",
      dataIndex: "Редактировать",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Сохранить
            </Typography.Link>
            <Popconfirm title="Уверены?" onConfirm={cancel}>
              <a>Отменить</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Редактировать
          </Typography.Link>
        );
      },
    },
  ];
  const handleAdd = () => {
    setData([...data, { id: 0, name: "default" }]);
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Button
        type="primary"
        style={{
          marginBottom: 16,
        }}
        onClick={handleAdd}
      >
        Добавить
      </Button>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
const EditableProductTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  useEffect(() => {
    axios.get(host + "api/Product/GetAll").then((resp) => {
      setData(resp.data);
    });
  }, [setData]);
  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const edit_id = (id) => {
    setEditingKey(id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);

      if (id !== 0) axios.put(host + `api/Product/Put`, { id, ...row });
      else axios.post(host + `api/Product/Post`, row);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const handleDeleteCategory = (id) => {
    axios.delete(host + `api/Product/Delete?entity=${id}`);
    setData(data.filter((item) => item.id !== id));
  };
  const columns = [
    {
      title: "Идентефикатор",
      dataIndex: "id",
      editable: false,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Название",
      dataIndex: "name",
      editable: true,
    },
    {
      title: "Категория",
      dataIndex: "categoryId",
      editable: true,
      sorter: (a, b) => a.categoryId - b.categoryId,
    },
    {
      title: "Цена",
      dataIndex: "price",
      editable: true,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Описание",
      dataIndex: "description",
      editable: true,
    },
    {
      title: "Редактировать",
      dataIndex: "Редактировать",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Сохранить
            </Typography.Link>
            <Popconfirm title="Уверены?" onConfirm={cancel}>
              <a>Отменить</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Редактировать
          </Typography.Link>
        );
      },
    },
  ];
  const handleAdd = () => {
    setData([...data, { id: 0, name: "default" }]);
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Button
        type="primary"
        style={{
          marginBottom: 16,
        }}
        onClick={handleAdd}
      >
        Добавить
      </Button>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
const EditableTagTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  useEffect(() => {
    axios.get(host + "api/Tag/GetAll").then((resp) => {
      setData(resp.data);
    });
  }, [setData]);
  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const edit_id = (id) => {
    setEditingKey(id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);
      if (id !== 0) axios.put(host + `api/Tag/Put`, { id, ...row });
      else axios.post(host + `api/Tag/Post`, row);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const handleDeleteCategory = (id) => {
    axios.delete(host + `api/Tag/Delete?entity=${id}`);
    setData(data.filter((item) => item.id !== id));
  };
  const columns = [
    {
      title: "Идентефикатор",
      dataIndex: "id",
      editable: false,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Название",
      dataIndex: "name",
      editable: true,
    },
    {
      title: "Категория",
      dataIndex: "categoryId",
      editable: true,
      sorter: (a, b) => a.categoryId - b.categoryId,
    },
    {
      title: "Редактировать",
      dataIndex: "Редактировать",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Сохранить
            </Typography.Link>
            <Popconfirm title="Уверены?" onConfirm={cancel}>
              <a>Отменить</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Редактировать
          </Typography.Link>
        );
      },
    },
  ];
  const handleAdd = () => {
    setData([...data, { id: 0, name: "default" }]);
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Button
        type="primary"
        style={{
          marginBottom: 16,
        }}
        onClick={handleAdd}
      >
        Добавить
      </Button>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
const EditableEntityAttributeTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  useEffect(() => {
    axios.get(host + "api/EntityAttribute/GetAll").then((resp) => {
      setData(resp.data);
    });
  }, [setData]);
  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const edit_id = (id) => {
    setEditingKey(id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);

      if (id !== 0) axios.put(host + `api/EntityAttribute/Put`, { id, ...row });
      else axios.post(host + `api/EntityAttribute/Post`, row);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const handleDeleteCategory = (id) => {
    axios.delete(host + `api/EntityAttribute/Delete?entity=${id}`);
    setData(data.filter((item) => item.id !== id));
  };
  const columns = [
    {
      title: "Идентефикатор",
      dataIndex: "id",
      editable: false,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Название",
      dataIndex: "name",
      editable: true,
    },
    {
      title: "Редактировать",
      dataIndex: "Редактировать",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Сохранить
            </Typography.Link>
            <Popconfirm title="Уверены?" onConfirm={cancel}>
              <a>Отменить</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Редактировать
          </Typography.Link>
        );
      },
    },
  ];
  const handleAdd = () => {
    setData([...data, { id: 0, name: "default" }]);
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Button
        type="primary"
        style={{
          marginBottom: 16,
        }}
        onClick={handleAdd}
      >
        Добавить
      </Button>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
const EditableValueAttributeTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  useEffect(() => {
    axios.get(host + "api/ValueAttribute/GetAll").then((resp) => {
      setData(resp.data);
    });
  }, [setData]);
  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const edit_id = (id) => {
    setEditingKey(id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);

      if (id !== 0) axios.put(host + `api/ValueAttribute/Put`, { id, ...row });
      else axios.post(host + `api/ValueAttribute/Post`, row);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const handleDeleteCategory = (id) => {
    axios.delete(host + `api/ValueAttribute/Delete?entity=${id}`);
    setData(data.filter((item) => item.id !== id));
  };
  const columns = [
    {
      title: "Идентефикатор",
      dataIndex: "id",
      editable: false,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Атрибут",
      dataIndex: "entityAttributeId",
      editable: true,
      sorter: (a, b) => a.entityAttributeId - b.entityAttributeId,
    },
    {
      title: "Продукт",
      dataIndex: "productId",
      editable: true,
      sorter: (a, b) => a.productId - b.productId,
    },
    {
      title: "Значение",
      dataIndex: "value",
      editable: true,
    },
    {
      title: "Редактировать",
      dataIndex: "Редактировать",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Сохранить
            </Typography.Link>
            <Popconfirm title="Уверены?" onConfirm={cancel}>
              <a>Отменить</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Редактировать
          </Typography.Link>
        );
      },
    },
  ];
  const handleAdd = () => {
    setData([...data, { id: 0, name: "default" }]);
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Button
        type="primary"
        style={{
          marginBottom: 16,
        }}
        onClick={handleAdd}
      >
        Добавить
      </Button>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
const EditableRefreshTokenTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  useEffect(() => {
    axios.get(host + "api/RefreshToken/GetAll").then((resp) => {
      setData(resp.data);
    });
  }, [setData]);
  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const edit_id = (id) => {
    setEditingKey(id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);

      if (id !== 0) axios.put(host + `api/RefreshToken/Put`, { id, ...row });
      else axios.post(host + `api/RefreshToken/Post`, row);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const handleDeleteCategory = (id) => {
    axios.delete(host + `api/RefreshToken/Delete?entity=${id}`);
    setData(data.filter((item) => item.id !== id));
  };
  const columns = [
    {
      title: "Идентефикатор",
      dataIndex: "id",
      editable: false,
    },
    {
      title: "Пользователь",
      dataIndex: "username",
      editable: false,
    },
    {
      title: "Токен",
      dataIndex: "tokenString",
      editable: false,
    },
    {
      title: "Истекает",
      dataIndex: "expireAt",
      editable: false,
    },
    {
      title: "Удалить",
      dataIndex: "operation",
      render: (_, record) => (
        <Popconfirm
          title="Точно удалить?"
          onConfirm={() => handleDeleteCategory(record.id)}
        >
          <a>Удалить</a>
        </Popconfirm>
      ),
    },
  ];
  const handleAdd = () => {
    setData([...data, { id: 0, name: "default" }]);
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
const EditableConversationTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  useEffect(() => {
    axios.get(host + "api/Conversation/GetAll").then((resp) => {
      setData(resp.data);
    });
  }, [setData]);
  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const edit_id = (id) => {
    setEditingKey(id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);

      if (id !== 0) axios.put(host + `api/Conversation/Put`, { id, ...row });
      else axios.post(host + `api/Conversation/Post`, row);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const handleDeleteCategory = (id) => {
    axios.delete(host + `api/Conversation/Delete?entity=${id}`);
    setData(data.filter((item) => item.id !== id));
  };
  const columns = [
    {
      title: "Идентефикатор",
      dataIndex: "id",
      editable: false,
    },
    {
      title: "Пользователь",
      dataIndex: "name",
      editable: false,
    },
    {
      title: "Электронная почта",
      dataIndex: "email",
      editable: false,
    },
    {
      title: "Сообщение",
      dataIndex: "message",
      editable: false,
    },
    {
      title: "Удалить",
      dataIndex: "operation",
      render: (_, record) => (
        <Popconfirm
          title="Точно удалить?"
          onConfirm={() => handleDeleteCategory(record.id)}
        >
          <a>Удалить</a>
        </Popconfirm>
      ),
    },
  ];
  const handleAdd = () => {
    setData([...data, { id: 0, name: "default" }]);
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

const AdminPage = () => {
  var download = require("downloadjs");
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState({
    username: null,
    hasComment: null,
    dateFrom: null,
    dateTo: null,
    search: null,
  });

  useEffect(() => {
    axios
      .post(host + "Admin/GetOrders", filter)
      .then((resp) => setOrders(resp.data));
  }, [filter, setFilter]);
  return (
    <>
      <AdminNavigation />
      <div style={{ marginTop: 80, padding: 20 }}>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Текущие заказы" key="1">
            <div className="container">
              <div className="row">
                <h5 className="col-6">Поиск</h5>
                <input
                  type="text"
                  id="search"
                  name="search"
                  className="form-control w3-col"
                  placeholder="Поиск"
                  value={filter.search}
                  onChange={(e) => {
                    setFilter({ ...filter, search: e.target.value });
                  }}
                />
                <p>C</p>
                <DatePicker
                  format={"YYYY/MM/DD"}
                  value={filter.dateFrom}
                  onChange={(x) => {
                    setFilter({ ...filter, dateFrom: x });
                  }}
                />
                <p>До</p>
                <DatePicker
                  format={"YYYY/MM/DD"}
                  value={filter.dateTo}
                  onChange={(x) => {
                    setFilter({ ...filter, dateTo: x });
                  }}
                />
              </div>
              <button
                className="btn"
                style={{ margin: 10 }}
                onClick={(e) => {
                  setFilter({
                    username: null,
                    hasComment: null,
                    dateFrom: null,
                    dateTo: null,
                    search: "",
                  });
                }}
              >
                Сбросить
              </button>
              <button
                className="btn"
                style={{ margin: 10 }}
                onClick={(e) => {
                  axios
                    .post(host + "Admin/GetReport", filter, {
                      responseType: "arraybuffer",
                    })
                    .then((resp) => {
                      const blob = new Blob([resp.data], {
                        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                      });

                      download(blob, "Report.xls");
                    });
                }}
              >
                Выгрузить в файл
              </button>
            </div>
            {!(orders === undefined) &&
              orders.map((order) => (
                <AdminOrder
                  id={order.id}
                  orderLines={order.orderLines}
                  comment={order.comment}
                  date={order.date}
                  state={order.state}
                  user={order.user.username}
                />
              ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Категории" key="2">
            <EditableCategoryTable />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Товары" key="3">
            <EditableProductTable />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Теги" key="4">
            <EditableTagTable />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Атрибуты" key="5">
            <EditableEntityAttributeTable />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Значения" key="6">
            <EditableValueAttributeTable />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Токены" key="7">
            <EditableRefreshTokenTable />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Обращения" key="8">
            <EditableConversationTable />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default AdminPage;
