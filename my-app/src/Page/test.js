import { Button, Checkbox, Form, Radio,Input,Space } from 'antd';
import { useEffect, useState } from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Calendar, theme } from 'antd';
const onPanelChange = (value, mode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 8,
    },
  },
};
const formItemLayoutWithOutLabel2 = {
  wrapperCol: {
    xs: {
      span: 10,
      offset: 0,
    },
    sm: {
      span: 10,
      offset: 8,
    },
  },
};


const { token } = theme.useToken();
  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
const App = () => {
  const [form] = Form.useForm();
  const [checkNick, setCheckNick] = useState(false);
  useEffect(() => {
    form.validateFields(['nickname']);
  }, [checkNick, form]);
  const onCheckboxChange = (e) => {
    setCheckNick(e.target.checked);
  };
  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  return (
    <Form
      form={form}
      name="dynamic_rule"
      style={{
        maxWidth: 1500,
      }}
    >
      <Form.Item
        {...formItemLayout}
        name="selectyear"
        label="ปีงบประมาณ"
        rules={[
          {
            required: true,
            message: 'Please input your name',
          },
        ]}
      >
        <Input placeholder="Please input your name" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="projectname"
        label="ชื่อโครงการ"
        rules={[
          {
            required: true,
            message: 'Please input your projectname',
          },
        ]}
      >
        <Input placeholder="Please input your name" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="unitco"
        label="หน่วยงานที่รับผิดชอบโครงการ"
        rules={[
          {
            required: true,
            message: 'Please input your name',
          },
        ]}
      >
        <Input placeholder="Please input your name" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="headproject"
        label="ผู้รับผิดชอบโครงการ"
        rules={[
          {
            required: true,
            message: 'Please input your name',
          },
        ]}
      >
        <Input placeholder="Please input your name" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="username"
        label="ประเด็นยุทธ์ศาสตร์"
        rules={[
          {
            required: true,
            message: 'Please input your name',
          },
        ]}
      >
        <Input placeholder="Please input your name" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="radio-group" label="ประเภทโครงการ" rules={[{ required: true, message: 'Please pick an item!' }]}>
      <Radio.Group>
        <Radio value="0">โครงการในแผน</Radio>
        <Radio value="1">โครงการนอกแผน</Radio>
      </Radio.Group>
    </Form.Item>
    <Form.Item {...formItemLayout} name="radio" label="ลักษณะโครงการ" rules={[{ required: true, message: 'Please pick an item!' }]}>
      <Radio.Group>
        <Radio value="0">โครงการใหม่</Radio>
        <Radio value="1">โครงการต่อเนื่อง</Radio>
        <Radio value="2">งานประจำ</Radio>
        <Radio value="3">งานพัฒนา</Radio>
      </Radio.Group>
    </Form.Item>
    <Form.Item
        {...formItemLayout}
        name="username"
        label="การบูรณาการโครงการ(เปลี่ยนเป็นดรอปดาวด้วย"
        rules={[
          {
            required: true,
            message: 'Please input your name',
          },
        ]}
      >
        <Input placeholder="Please input your name" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="username"
        label="หลักการและเหตุผล"
        rules={[
          {
            required: true,
            message: 'Please input your name',
          },
        ]}
      >
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>
      <Form.List
        name="names"
        {...formItemLayout}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'วัตถุประสงค์ ' : ''}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input passenger's name or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="วัตถุประสงค์ "
                    style={{
                      width: '60%',
                    }}
                  />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item {...formItemLayoutWithOutLabel2} >
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add sights
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List >
      <Form.List
        name="test"
        {...formItemLayout}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'ตัวชี้วัดความสำเร็จ ' : ''}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input passenger's name or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="ตัวชี้วัดความสำเร็จ "
                    style={{
                      width: '60%',
                    }}
                  />
                </Form.Item>
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input passenger's name or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="หน่วยนับ "
                    style={{
                      width: '60%',
                    }}
                  />
                </Form.Item>
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input passenger's name or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="ค่าเป้าหมาย "
                    style={{
                      width: '60%',
                    }}
                  />
                </Form.Item>
                
                
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item {...formItemLayoutWithOutLabel2} >
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add sights
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List >
    <Form.Item
        {...formItemLayout}
        name="username"
        label="กลุ่มเป้าหมาย"
        rules={[
          {
            required: true,
            message: 'Please input your name',
          },
        ]}
      >
        <Input placeholder="Please input your name" />
      </Form.Item>
      <Form.List
        name="kanton"
        {...formItemLayout}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'ขั้นตอนการดำเนินการ ' : ''}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input passenger's name or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="ขั้นตอนการดำเนินการ/รายการกิจกรรม "
                    style={{
                      width: '60%',
                    }}
                  />
                </Form.Item>
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input passenger's name or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="เริ่มต้น "
                    style={{
                      width: '60%',
                    }}
                  />
                </Form.Item>
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input passenger's name or delete this field.",
                    },
                  ]}
                  noStyle
                >            
                  <Input
                    placeholder="สิ้นสุด "
                    style={{
                      width: '60%',
                    }}
                  >
               {/* <Calendar fullscreen={false} onPanelChange={onPanelChange} /> */}
                  </Input>
                </Form.Item>
                
                
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item {...formItemLayoutWithOutLabel2} >
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add sights
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List >
      <Form.Item
        {...formItemLayout}
        name="username"
        label="3ช่อง"
        rules={[
          {
            required: true,
            message: 'Please input your name',
          },
        ]}
      >
        <Input placeholder="Please input your name" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="username"
        label="แหล่งเงิน/ประเภทงบประมาณที่ใช้dropdown"
        rules={[
          {
            required: true,
            message: 'Please input your name',
          },
        ]}
      >
        <Input placeholder="Please input your name" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="username"
        label="ปริมาณการงบประมาณที่ใช้"
        rules={[
          {
            required: true,
            message: 'Please input your name',
          },
        ]}
      >
        <Input placeholder="Please input your name" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="username"
        label="แผนงาน/dropdown"
        rules={[
          {
            required: true,
            message: 'Please input your name',
          },
        ]}
      >
        <Input placeholder="Please input your name" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="username"
        label="ประเภทการใช้จ่าย/dinamic"
        rules={[
          {
            required: true,
            message: 'Please input your name',
          },
        ]}
      >
        <Input placeholder="Please input your name" />
      </Form.Item>
    
      <Form.List
        name="heal"
        {...formItemLayout}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'ประโยชน์ที่คาดว่าจะได้รับ ' : ''}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input passenger's name or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="ประโยชน์ที่คาดว่าจะได้รับ "
                    style={{
                      width: '60%',
                    }}
                  />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item {...formItemLayoutWithOutLabel2} >
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add sights
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List >
      <Form.Item {...formItemLayout} name="radio" label="เอกสาร TOR" rules={[{ required: true, message: 'Please pick an item!' }]}>
      <Radio.Group>
        <Radio value="0">มี</Radio>
        <Radio value="1">ไม่มี</Radio>
      </Radio.Group>
    </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        
      </Form.Item>
      
    </Form>
  );
};
export default App;
