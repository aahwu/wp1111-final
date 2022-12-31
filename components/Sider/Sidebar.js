import { IconButton, Typography } from '@mui/material'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  DatabaseOutlined,
  AppstoreOutlined,
  HeartOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const Sidebar = ({ sidebarItem, selectedId, handleOnClick }) => {
  return (
    <div
      style={{
        flex: 'row'
      }}
    >
      <div
        style={{
          height: 32,
          margin: 8,
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography style={{
          color: 'black',
        }}>
          {sidebarItem.user}
        </Typography>
        <IconButton>
          <LogoutOutlined 
            style={{
              // color: 'black',
              fontSize: 20,
            }}
          />
        </IconButton>
      </div>
      <Layout.Sider
        // collapsible
        // collapsed={collapsed}
        // onCollapse={(value) => setCollapsed(value)}
        style={{
          width: 250,
          minWidth: 250,
          height: '100%',
        }}  
      >
        {/* <div
          style={{
            height: 32,
            margin: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
            // background: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          <Typography style={{
            color: 'white',
          }}>
            {sidebarItem.user}
          </Typography>
          <IconButton>
            <LogoutOutlined 
              style={{
                color: 'white',
                fontSize: 20,
              }}
            />
          </IconButton>
        </div> */}
        <Menu
          theme="light"
          style={{
            height: '100%',
          }}
          mode="inline"
          items={sidebarItem.items}
          defaultOpenKeys={['sub1']}
          onClick={handleOnClick}
        />
      </Layout.Sider>
    </div>
  )
}

export default Sidebar;