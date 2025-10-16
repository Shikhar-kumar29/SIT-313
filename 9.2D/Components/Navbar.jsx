import { Link } from 'react-router-dom';
import { Menu, Container, Icon } from 'semantic-ui-react';

function Navbar() {
  return (
    <Menu inverted color='blue' size='large' style={{ margin: 0, borderRadius: 0 }}>
      <Container>
        <Menu.Item as={Link} to='/' header>
          <Icon name='code' />
          DEV@Deakin
        </Menu.Item>
        <Menu.Item as={Link} to='/'>
          <Icon name='home' />
          Home
        </Menu.Item>
        <Menu.Item as={Link} to='/post'>
          <Icon name='pencil' />
          Post
        </Menu.Item>
        <Menu.Item as={Link} to='/find-questions'>
          <Icon name='search' />
          Find Questions
        </Menu.Item>
        <Menu.Item as={Link} to='/plans'>
          <Icon name='star' />
          Plans
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default Navbar;
