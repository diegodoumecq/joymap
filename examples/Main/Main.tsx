import React, { ReactNode } from 'react';
import { upperFirst } from 'lodash/fp';
import Iframe from 'react-iframe';
import 'react-web-vector-icons/fonts/MaterialCommunityIcons.ttf';
import { MaterialCommunityIcons } from 'react-web-vector-icons';

import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  ButtonBase,
} from '@material-ui/core';

import fightingResources from './sandboxParams/fightingSandbox';
import reactResources from './sandboxParams/reactSandbox';
import rumbleResources from './sandboxParams/rumbleSandbox';
import logResources from './sandboxParams/logSandbox';
import videoResources from './sandboxParams/videoSandbox';
import editorResources from './sandboxParams/editorSandbox';
import { useStyles } from './styles';
import { useParamNav } from './paramNav';

interface Page {
  html: string;
  title: string;
  gitPath: string;
  params?: string;
  icon: ReactNode;
}

const docs: Record<string, Page> = {
  readme: {
    html: 'readme.html',
    title: 'Readme',
    gitPath: '',
    icon: <MaterialCommunityIcons name="book-open-page-variant" />,
  },
};

const examples: Record<string, Page> = {
  react: {
    html: 'react.html',
    title: 'React Example',
    gitPath: 'tree/master/examples/React',
    params: reactResources,
    icon: <MaterialCommunityIcons name="react" />,
  },
  fighting: {
    html: 'fighting.html',
    title: 'Fighting Example',
    gitPath: 'tree/master/examples/Fighting',
    params: fightingResources,
    icon: <MaterialCommunityIcons name="arrow-decision" />,
  },
  rumble: {
    html: 'rumble.html',
    title: 'Rumble Example',
    gitPath: 'tree/master/examples/Rumble',
    params: rumbleResources,
    icon: <MaterialCommunityIcons name="test-tube" />,
  },
  log: {
    html: 'log.html',
    title: 'Log Example',
    gitPath: 'tree/master/examples/Log',
    params: logResources,
    icon: <MaterialCommunityIcons name="clipboard-text-outline" />,
  },
  video: {
    html: 'video.html',
    title: 'Video Example',
    gitPath: 'tree/master/examples/Video',
    params: videoResources,
    icon: <MaterialCommunityIcons name="video" />,
  },
  editor: {
    html: 'editor.html',
    title: 'Editor Example',
    gitPath: 'tree/master/examples/Editor',
    params: editorResources,
    icon: <MaterialCommunityIcons name="clipboard-text" />,
  },
};

export default function Main() {
  const classes = useStyles();
  const [pageName, navigate] = useParamNav();

  const page = examples[pageName] || docs[pageName] || examples.react;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" noWrap>
            {page.title}
          </Typography>
          <div style={{ display: 'flex' }}>
            {!!page.params && (
              <form
                action="https://codesandbox.io/api/v1/sandboxes/define"
                method="POST"
                target="_blank"
              >
                <input type="hidden" name="parameters" value={page.params} />
                <ButtonBase type="submit" className={classes.headerButton}>
                  <img src="codesandbox.svg" />
                  <span className={classes.headerButtonText}>Edit on codesandbox</span>
                </ButtonBase>
              </form>
            )}
            <ButtonBase
              type="button"
              className={classes.headerButton}
              onClick={() => {
                window.open(`https://github.com/diegodoumecq/joymap/${page.gitPath}`, '_blank');
              }}
            >
              <MaterialCommunityIcons name="github-circle" color="white" />
              <span className={classes.headerButtonText}>View on github</span>
            </ButtonBase>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div style={{ display: 'flex', background: '#5700FA', justifyContent: 'flex-end' }}>
          <img src="logo.png" style={{ width: '4rem' }} />
        </div>
        <Divider />
        <List>
          {Object.entries(docs).map(([id, page]) => (
            <ListItem
              button
              key={id}
              onClick={(e) => {
                e.preventDefault();
                navigate(id);
              }}
            >
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={page.title} />
            </ListItem>
          ))}
          <Divider />
          {Object.entries(examples).map(([id, page]) => (
            <ListItem
              button
              key={id}
              onClick={(e) => {
                e.preventDefault();
                navigate(id);
              }}
            >
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={upperFirst(id)} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbarSpacer} />
        <Iframe
          key={page.html}
          url={page.html}
          width="100%"
          height="100%"
          className={classes.iframe}
          display="block"
          position="relative"
        />
      </main>
    </div>
  );
}
