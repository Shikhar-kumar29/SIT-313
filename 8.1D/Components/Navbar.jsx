import { Link } from 'react-router-dom';
import { Menu, Container } from 'semantic-ui-react';

function Navbar() {
  return (
    <Menu inverted color='blue' size='large'>
      <Container>
        <Menu.Item as={Link} to='/' header>
          DEV@Deakin
        </Menu.Item>
        <Menu.Item as={Link} to='/'>
          Home
        </Menu.Item>
        <Menu.Item as={Link} to='/post'>
          Post
        </Menu.Item>
        <Menu.Item as={Link} to='/find-questions'>
          Find Question
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default Navbar;
