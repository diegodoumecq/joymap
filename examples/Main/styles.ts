import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: {
    display: 'flex',
    'justify-content': 'space-between',
    background: '#5700FA',
  },
  toolbarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    position: 'relative',
    height: 'calc(100% - 64px)',
  },
  headerButtonText: {
    marginLeft: '0.5rem',
  },
  headerButton: {
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    height: '34px',
  },
  iframe: {
    border: 'none',
  },
}));
