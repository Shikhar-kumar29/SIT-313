import React from 'react';
import { Container, Grid, Header, Button, Icon, List, Divider } from 'semantic-ui-react';

const Footer = () => {
  return (
    <footer style={{
      marginTop: '3rem',
      borderRadius: '18px 18px 0 0',
      background: 'linear-gradient(120deg, #003a61 0%, #005b96 50%, #0077b6 100%)',
      padding: '3rem 0 2rem',
      borderTop: '4px solid #ffcc00'
    }}>
      <Container style={{ maxWidth: 1200 }}>
        <Grid stackable columns={2} style={{ marginBottom: '2rem' }}>
          <Grid.Row>
            <Grid.Column width={10}>
              <Header as='h2' style={{ color: '#fff', marginBottom: '1rem' }}>
                Connect with Deakin University
              </Header>
              <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem', maxWidth: 600, lineHeight: 1.6 }}>
                Stay updated with the latest news, events, and opportunities at Deakin University. 
                Follow our official social media channels to join our vibrant community of learners and innovators.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Button as='a' href='https://www.facebook.com/Deakin' target='_blank' rel='noopener noreferrer' color='facebook' style={{ backgroundColor: '#1877f2', color: 'white' }}>
                  <Icon name='facebook f' /> Facebook
                </Button>
                <Button as='a' href='https://twitter.com/deakin' target='_blank' rel='noopener noreferrer' color='twitter' style={{ backgroundColor: '#1da1f2', color: 'white' }}>
                  <Icon name='twitter' /> Twitter
                </Button>
                <Button as='a' href='https://www.instagram.com/deakinuniversity/' target='_blank' rel='noopener noreferrer' color='instagram' style={{ background: 'linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d)' }}>
                  <Icon name='instagram' /> Instagram
                </Button>
                <Button as='a' href='https://www.linkedin.com/school/deakin-university/' target='_blank' rel='noopener noreferrer' color='linkedin' style={{ backgroundColor: '#0a66c2', color: 'white' }}>
                  <Icon name='linkedin' /> LinkedIn
                </Button>
                <Button as='a' href='https://www.youtube.com/user/Deakin' target='_blank' rel='noopener noreferrer' color='youtube' style={{ backgroundColor: '#ff0000', color: 'white' }}>
                  <Icon name='youtube' /> YouTube
                </Button>
              </div>
            </Grid.Column>
            <Grid.Column width={6}>
              <Header as='h3' style={{ color: '#ffcc00', marginBottom: '1rem' }}>Quick Links</Header>
              <List link style={{ color: 'white' }}>
                <List.Item as='a' href='https://www.deakin.edu.au/courses' style={{ color: 'rgba(255,255,255,0.9)' }}>
                  <Icon name='graduation cap' /> Courses
                </List.Item>
                <List.Item as='a' href='https://www.deakin.edu.au/campuses' style={{ color: 'rgba(255,255,255,0.9)' }}>
                  <Icon name='map marker alternate' /> Campuses
                </List.Item>
                <List.Item as='a' href='https://www.deakin.edu.au/students' style={{ color: 'rgba(255,255,255,0.9)' }}>
                  <Icon name='user graduate' /> Current Students
                </List.Item>
                <List.Item as='a' href='https://www.deakin.edu.au/research' style={{ color: 'rgba(255,255,255,0.9)' }}>
                  <Icon name='flask' /> Research
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        
        <Divider style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
        
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '0.5rem' }}>
            <Icon name='copyright outline' /> {new Date().getFullYear()} Deakin University. All rights reserved.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9em' }}>
            CRICOS Provider Code: 00113B | ABN: 56 721 584 203 | TEQSA Provider ID: PRV12102
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
