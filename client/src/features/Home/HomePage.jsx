import React from 'react';

/* MUI Components */
import { Container, Grid, withStyles, Typography, Button, Link } from '@material-ui/core';

const styles = theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
});

const HomePage = ({ classes, history: { push } }) => {
  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
          Threedium Code Test
        </Typography>
        <Typography component="h1" variant="h5" align="left" color="textPrimary" gutterBottom>
          Hi! Below is some brief info about how the app works.
        </Typography>
        <Typography variant="h6" align="left" color="textSecondary" paragraph>
          The app features user registeration, login/logout, CRUD for articles, pagination, user article filtering.
          The app also support basic HTML markdown which uses markdown-to-jsx dependency
        </Typography>
        <Typography variant="h6" align="left" color="textSecondary" paragraph>
          Supported HTML tags: p, h1-h6, strong, img, a, ol, ul, li, i
        </Typography>
        <Typography variant="h6" align="left" color="textSecondary" paragraph>
          In order to use the app, you have to be signed in.
          I've provided an account for you which you can use to test the app:
          email: admin@mail.com |
          password: admin.1234
        </Typography>
        <Typography variant="h6" align="left" color="textSecondary" paragraph>
          Instructions on how to run the app locally are available on my github page
          <Link href={'https://github.com/turkonjavla/threedium_web_dev_app'} color="primary" className={classes.link}>
            {' Threedium Code Test Repo'}
          </Link>
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button variant="contained" color="primary" onClick={() => push('/articles')}>
                Go to articles
            </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  )
}

export default withStyles(styles)(HomePage)
