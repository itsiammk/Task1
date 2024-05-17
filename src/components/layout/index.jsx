import React, { useState } from 'react';
import {
  FileOutlined,
  TeamOutlined,
  RocketOutlined,
  DashboardOutlined,
  BankOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Temp from '../Form'; 
import Manage from '../manageProject';
import Reporting from '../Reporting';
import Administration from '../Administration';
import Dashboard from '../DashBoard';
import Company from '../Company';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
    getItem('Dashboard', '1', <DashboardOutlined />),
    getItem('Company', '2', <BankOutlined />),
  getItem('Project', 'sub1', <RocketOutlined />, [
    getItem('Create Project', '3'),
    getItem('Manage Project', '4'),
  ]),
  getItem('Reporting', '5', <FileOutlined />),
  getItem('Administration', '6', <TeamOutlined />),
];
const CostomLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    switch (e.key) {
      case '1':
        navigate('/dashboard');
        break;
      case '2':
        navigate('/company');
        break;
      case '3':
        navigate('/create-project');
        break;
      case '4':
        navigate('/manage-project');
        break;
      case '5':
        navigate('/reporting');
        break;
      case '6':
        navigate('/administration');
        break;
      default:
        break;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['3']} mode="inline" items={items} onClick={handleMenuClick} defaultOpenKeys={["sub1"]}/>
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          <div >
            <Routes>
              <Route path="/" element={<Temp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/company" element={<Company />} />
              <Route path="/create-project" element={<Temp />} />
              <Route path="/manage-project" element={<Manage />} />
              <Route path="/reporting" element={<Reporting />} />
              <Route path="/administration" element={<Administration />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default CostomLayout;