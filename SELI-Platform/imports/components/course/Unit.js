import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2),
  },
  root: {
    width: '100%',
    maxWidth: 220,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function Unit(props) {
  const classes = useStyles();
  const [openList, setOpenList] = React.useState(true);

  function handleClickList() {
    setOpenList(!openList);
  }

  return(
    <div className={props.unitIndex === props.index ? "course-creator-selected-unit-container" : "course-creator-unit-container"}>
      <ListItem className="course-creator-unit-list-item" button>
        <ListItemText className="course-creator-unit-list-text" primary={props.unit.name} secondary={'Unit N ' + (parseInt(props.index) + parseInt(1))}/>
        <IconButton onClick={() => props.setUnitToEdit(props.index, props.unit.name)} className="course-creator-lesson-list-button" edge="end" aria-label="delete">
          <EditIcon className="course-creator-lesson-list-icon" fontSize="small"/>
        </IconButton>
        <IconButton onClick={() => props.deleteUnit(props.index)} className="course-creator-lesson-list-button" edge="end" aria-label="delete">
          <DeleteIcon className="course-creator-lesson-list-icon" fontSize="small"/>
        </IconButton>
        {openList ? <ExpandLess className="course-creator-lesson-list-icon" style={{animation: "fadeIn 0.25s", marginLeft: "0.25vw"}} onClick={handleClickList}/> : <ExpandMore className="course-creator-lesson-list-icon" style={{animation: "fadeIn 0.25s", marginLeft: "0.25vw"}} onClick={handleClickList}/>}
      </ListItem>
      <Collapse className="course-creator-lessons-container" in={openList} timeout="auto" unmountOnExit>
        <List className="course-creator-lesson-container" component="div" disablePadding>
          {
            props.unit.lessons.map((lesson, index) => {
              return (
                <ListItem className="course-creator-unit-list-item" button>
                  <ListItemText className="course-creator-lesson-list-text" primary={lesson.name} secondary={"Lesson N " + parseInt(index + 1)}/>
                  <IconButton onClick={() => props.setSubunitToEdit(props.index, index, lesson.name)} className="course-creator-lesson-list-button" edge="end" aria-label="delete">
                    <EditIcon className="course-creator-lesson-list-icon" fontSize="small"/>
                  </IconButton>
                  <IconButton onClick={() => props.deleteSubunit(props.index, index)}  className="course-creator-lesson-list-button" edge="end" aria-label="delete">
                    <DeleteIcon className="course-creator-lesson-list-icon" fontSize="small"/>
                  </IconButton>
                </ListItem>
              )
            })
          }
        </List>
        <Button onClick={() => props.setUnitIndex(props.index)} className="course-creator-unit-action" fullWidth>Add lesson</Button>
      </Collapse>
    </div>
  );
}
