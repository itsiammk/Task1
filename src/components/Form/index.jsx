import React, { useEffect, useState } from "react";
import { Form, Input, Table, Button } from "antd/lib";
import { Select, Space } from "antd";
import { Checkbox } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { transformData } from "../../utils";
import TextArea from "antd/es/input/TextArea";

function Temp() {
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const onCross = (record) => {
    setData((prevData) => prevData.filter((item) => item.key !== record.key));
    const currentRegion = data.filter((item) => item.key !== record.key);
    const countrySet = new Set();
    const currentRegionArray = [];

    currentRegion.forEach((item) => {
      if (!countrySet.has(item.country)) {
        countrySet.add(item.country);
        currentRegionArray.push(`${item.country}-${item.language}`);
      }
    });
    form.setFieldsValue({
      Regions: currentRegionArray,
    });
  };

  const onPlus = (record) => {
    setData((prevData) => {
      const newData = [...prevData];
      const index = newData.findIndex((item) => item.key === record.key);
      const newKey = Math.max(...newData.map((item) => parseInt(item.key))) + 1;
      const newRecord = { ...record, key: newKey };
      newData.splice(index + 1, 0, newRecord);
      return newData;
    });
  };

  const columns = [
    {
      title: "Sel.",
      dataIndex: "sel",
      key: "sel",
      width: 20,
      render: (val, record, index) => (
        <Form.Item>
          <Input
            type="checkbox"
            checked={record.selected || false}
            onChange={(e) => {
              const newData = [...data];
              newData[index].selected = e.target.checked;
              setData(newData);
            }}
          />
        </Form.Item>
      ),
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
    },
    {
      title: "Target Group",
      dataIndex: "targetGroup",
      width: 280,
      render: (val, record) => {
        return (
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <Form.Item name={`targetGroup_${record.key}`}>
              <Input />
            </Form.Item>
            <div
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
                paddingBottom: "25px",
              }}
            >
              <button
                style={{
                  backgroundColor: "green",
                  padding: "5px",
                  borderRadius: "50%",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  width: "30px",
                }}
                onClick={() => onPlus(record)}
              >
                <PlusOutlined />
              </button>
              <button
                style={{
                  backgroundColor: "red",
                  padding: "5px",
                  borderRadius: "50%",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  width: "30px",
                }}
                onClick={() => onCross(record)}
              >
                <CloseOutlined />
              </button>
            </div>
          </div>
        );
      },
    },
    {
      title: "CPI($)",
      dataIndex: "cpi",
      key: "cpi",
      width: 200,
      render: (val, record) => (
        <Form.Item name={`cpi_${record.key}`}>
          <Input />
        </Form.Item>
      ),
    },
    {
      title: "LOI(MIN.)",
      dataIndex: "loi",
      key: "loi",
      width: 200,
      render: (val, record) => (
        <Form.Item name={`loi_${record.key}`}>
          <Input />
        </Form.Item>
      ),
    },
    {
      title: "IR(%)",
      dataIndex: "ir",
      key: "ir",
      width: 200,
      render: (val, record) => (
        <Form.Item name={`ir_${record.key}`}>
          <Input />
        </Form.Item>
      ),
    },
    {
      title: "Completes",
      dataIndex: "completes",
      key: "completes",
      width: 200,
      render: (val, record) => (
        <Form.Item name={`completes_${record.key}`}>
          <Input />
        </Form.Item>
      ),
    },
  ];

  const handleSubmit = (values) => {
    const updatedData = transformData(values, data);
    console.log("FormData --> ", updatedData);
  };

  const options = [
    {
      label: "China",
      value: "china-Chinese",
      emoji: "🇨🇳",
      desc: "China",
    },
    {
      label: "Brazil",
      value: "Brazil-Portuguese",
      emoji: "bn",
      desc: "Brazil",
    },
    {
      label: "USA",
      value: "usa-English",
      emoji: "🇺🇸",
      desc: "USA",
    },
    {
      label: "Japan",
      value: "japan-Japanese",
      emoji: "🇯🇵",
      desc: "Japan",
    },
    {
      label: "Korea",
      value: "korea-Korean",
      emoji: "🇰🇷",
      desc: "Korea",
    },
  ];
  const handleCountryChange = (value) => {
    const newData = value.map((region, key) => {
      const [country, lang] = region.split("-");
      return {
        key: key,
        country: country,
        language: lang,
      };
    });
    setData(newData);
  };
  return (
    <>
        <Button className="backBtn">
            <span style={{paddingRight: '8px'}}>&larr;</span>
            <span>Back</span>
        </Button>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <div className="mainContainer">
          <div className="container">
            <h4 className="header-text">PROJECT INFORMATION</h4>
            <div className="first">
              <Form.Item
                name="ProjectName"
                label="Project Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="Name" className="input-tag" />
              </Form.Item>
              <Form.Item name="job" label="Work Order No. #">
                <Input placeholder="Work Order Number" className="input-tag" />
              </Form.Item>
            </div>
            <div className="second">
              <Form.Item
                name="ProjectType"
                label="Project Type"
                rules={[{ required: true }]}
              >
                <Select
                  className="input-tag"
                  options={[
                    { value: "Professional", label: "Professional" },
                    { value: "Local", label: "Local" },
                  ]}
                  style={{ width: 285 }}
                  placeholder="Please select"
                />
              </Form.Item>
              <Form.Item name="Category" label="Category">
                <Select
                  className="input-tag"
                  options={[
                    { value: "Front End", label: "Front End" },
                    { value: "Back End", label: "Back End" },
                  ]}
                  style={{ width: 285 }}
                  placeholder="Please select"
                />
              </Form.Item>
              <Form.Item name="Client" label="Client">
                <Select
                  className="input-tag"
                  options={[
                    { value: "Google", label: "Google" },
                    { value: "Meta", label: "Meta" },
                  ]}
                  style={{ width: 285 }}
                  placeholder="Please select"
                />
              </Form.Item>
            </div>
            <div className="third">
              <Form.Item name="ClientsContact" label="Client's Contact">
                <Select
                  className="input-tag"
                  options={[
                    { value: "Phone", label: "Phone" },
                    { value: "option 2", label: "option 2" },
                  ]}
                  style={{ width: 285 }}
                  placeholder="Please select"
                />
              </Form.Item>
              <Form.Item name="SalesPerson" label="Sales Person">
                <Select
                  className="input-tag"
                  options={[
                    { value: "Person 1", label: "Person 1" },
                    { value: "Person 2", label: "Person 2" },
                  ]}
                  style={{ width: 285 }}
                  placeholder="Please select"
                />
              </Form.Item>
              <Form.Item name="ProjectManager" label="Project Manager">
                <Select
                  className="input-tag"
                  options={[
                    { value: "Manager 1", label: "Manager 1" },
                    { value: "Manager 2", label: "Manager 2" },
                    { value: "Manager 3", label: "Manager 3" },
                    { value: "Manager 4", label: "Manager 4" },
                  ]}
                  style={{ width: 285 }}
                  placeholder="Please select"
                />
              </Form.Item>
            </div>
            <div className="four">
              <Form.Item name="PropertyDesc" label="Property Description">
                <TextArea
                  placeholder="Property Description"
                  className="Property-Description"
                  autoSize={{ minRows: 4, maxRows: 5 }}
                />
              </Form.Item>
            </div>
          </div>
          <div className="container2">
            <div>
              <h4 className="Device-heading">DEVICES</h4>
              {/* <div className="devices"> */}
              <Form.Item name="devices" valuePropName="checked">
                <Checkbox.Group className="devices">
                  <Checkbox className="check" value="Mobile">
                    Mobile
                  </Checkbox>
                  <Checkbox className="check" value="Tablet">
                    Tablet
                  </Checkbox>
                  <Checkbox className="check" value="Desktop">
                    Desktop
                  </Checkbox>
                </Checkbox.Group>
              </Form.Item>
              {/* </div> */}
            </div>
            <div>
              <h4 className="Device-heading">FILTER OPTIONS</h4>
              {/* <div className="devices"> */}
              <Form.Item name="filterOptions" valuePropName="checked">
                <Checkbox.Group className="filter">
                  <Checkbox className="check" value="gatesurvey">
                    Gatesurvey
                  </Checkbox>
                  <Checkbox className="check" value="fraud_detection">
                    fraud_detection
                  </Checkbox>
                </Checkbox.Group>
              </Form.Item>
              {/* </div> */}
            </div>
          </div>
        </div>

        <div>
          <h4 className="regions-heading">REGIONS</h4>
          <div className="regions">
            <Form.Item name="Regions" label="Country">
              <Select
                mode="multiple"
                style={{
                  width: "100%",
                }}
                placeholder="select one country"
                onChange={(e) => handleCountryChange(e)}
                options={options}
                optionRender={(option) => (
                  <Space>
                    <span role="img" aria-label={option.data.label}>
                      {option.data.emoji}
                    </span>
                    {option.data.desc}
                  </Space>
                )}
              />
            </Form.Item>
          </div>
        </div>
        <div className="formMain">
          <h4 className="header-text">SPECIFICATIONS <span style={{color: 'red'}}>*</span></h4>
          <Table pagination={false} dataSource={data} columns={columns} />
        </div>
        <div className="Button">
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: "16px", background: "red" }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: "16px", marginLeft: "2px" }}
          >
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
}

export default Temp;
