import { Link, useNavigate } from 'react-router-dom';
import { Menu, Container, Icon } from 'semantic-ui-react';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout, loading, isPremium } = useAuth();
  const navigate = useNavigate();
  const navItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'inherit',
    textDecoration: 'none'
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error('Failed to sign out:', err);
    }
  };

  return (
    <Menu inverted color='blue' size='large' style={{ margin: 0, borderRadius: 0, borderBottom: 'none', boxShadow: 'none' }}>
      <Container>
        <Menu.Item as={Link} to='/' header>
          <Icon name='code' />
          DEV@Deakin
        </Menu.Item>
        <Menu.Item as={Link} to='/' style={navItemStyle}>
          <Icon name='home' />
          <span>Home</span>
        </Menu.Item>
        {user && (
          <>
            <Menu.Item as={Link} to='/post' style={navItemStyle}>
              <Icon name='pencil' />
              <span>Post</span>
            </Menu.Item>
            <Menu.Item as={Link} to='/find-questions' style={navItemStyle}>
              <Icon name='search' />
              <span>Find Questions</span>
            </Menu.Item>
          </>
        )}
        {!loading && isPremium && (
          <>
            <Menu.Item as={Link} to='/premium/analytics' style={navItemStyle}>
              <Icon name='chart line' />
              <span>Analytics Dashboard</span>
            </Menu.Item>
            <Menu.Item as={Link} to='/premium/support' style={navItemStyle}>
              <Icon name='life ring' />
              <span>Priority Support</span>
            </Menu.Item>
            <Menu.Item as={Link} to='/post' style={navItemStyle}>
              <Icon name='code' />
              <span>Advanced Code Editor</span>
            </Menu.Item>
          </>
        )}
        {!loading && !isPremium && (
          <Menu.Item as={Link} to='/plans' style={navItemStyle}>
            <Icon name='tasks' />
            <span>Plans</span>
          </Menu.Item>
        )}
        <Menu.Menu position='right'>
          {loading && (
            <Menu.Item disabled style={navItemStyle}>
              <Icon name='spinner' loading />
              <span>Loading</span>
            </Menu.Item>
          )}
          {!loading && (
            <>
              {!user && (
                <Menu.Item as={Link} to='/login' style={navItemStyle}>
                  <Icon name='sign in' />
                  <span>Sign In</span>
                </Menu.Item>
              )}
              {user && (
                <Menu.Item onClick={handleLogout} style={navItemStyle}>
                  <Icon name='sign out' />
                  <span>Sign Out</span>
                </Menu.Item>
              )}
            </>
          )}
        </Menu.Menu>
      </Container>
    </Menu>
  );
}

export default Navbar;
