import React from 'react'

/// Material imports
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

function ListDrawer(props) {

  const classes = useStyles();

  const list = (
    <div
      role="presentation"
      className={clsx(classes.list, {
        [classes.fullList]: false,
      })}
      onClick={props.onClose}
      onKeyDown={props.onClose}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Drawer
      anchor="left"
      open={props.open}
      onClose={props.onClose}
      classes={{
        paper: classes.drawerPaper,
      }}>
      {list}
    </Drawer>
  )
}

export default ListDrawer
