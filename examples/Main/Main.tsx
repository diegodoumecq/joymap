import { ReactNode } from 'react';
import { upperFirst } from 'lodash/fp';
import Iframe from 'react-iframe';

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
import editorResources from './sandboxParams/editorSandbox';
import { useStyles } from './styles';
import { useParamNav } from './paramNav';
import {
  ArcadeStickIcon,
  BeakerIcon,
  BookOpenIcon,
  ClipboardIcon,
  GithubIcon,
  PencilSquareIcon,
  ReactIcon,
} from './icons';

interface Page {
  html: string;
  title: string;
  gitPath: string;
  params?: string;
  icon: ReactNode;
}

const docs: Record<string, Page> = {
  readme: {
    html: 'examples/Main/Readme/index.html',
    title: 'Readme',
    gitPath: '',
    icon: <BookOpenIcon />,
  },
};

const examples: Record<string, Page> = {
  react: {
    html: 'examples/React/index.html',
    title: 'React Example',
    gitPath: 'tree/master/examples/React',
    params: reactResources,
    icon: <ReactIcon />,
  },
  fighting: {
    html: 'examples/Fighting/index.html',
    title: 'Fighting Example',
    gitPath: 'tree/master/examples/Fighting',
    params: fightingResources,
    icon: <ArcadeStickIcon />,
  },
  rumble: {
    html: 'examples/Rumble/index.html',
    title: 'Rumble Example',
    gitPath: 'tree/master/examples/Rumble',
    params: rumbleResources,
    icon: <BeakerIcon />,
  },
  log: {
    html: 'examples/Log/index.html',
    title: 'Log Example',
    gitPath: 'tree/master/examples/Log',
    params: logResources,
    icon: <ClipboardIcon />,
  },
  editor: {
    html: 'examples/Editor/index.html',
    title: 'Editor Example',
    gitPath: 'tree/master/examples/Editor',
    params: editorResources,
    icon: <PencilSquareIcon />,
  },
} as const;

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
                  <img src="/assets/codesandbox.svg" />
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
              <GithubIcon />
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
          <img src="/assets/logo.png" style={{ width: '4rem' }} />
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

