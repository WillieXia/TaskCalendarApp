import React from 'react'
import { Link } from 'react-router-dom'

/// Material imports
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

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
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            My lists
          </ListSubheader>
        }>
        {props.lists.map((list) => (
          <ListItem 
            component={Link} 
            to={`/list/${list._id}`} 
            button 
            key={list._id}>
            <ListItemText 
              primary={list.name} 
              key={list._id}
            />
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
