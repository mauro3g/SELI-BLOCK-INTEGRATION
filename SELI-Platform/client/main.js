import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  Router,
  Switch,
  BrowserRouter
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Tracker } from 'meteor/tracker';

import Main from '../imports/ui/Main';
import Home from '../imports/ui/Home';
import Test from '../imports/ui/Test';
import AuthoringTool from '../imports/ui/AuthoringTool';
import TutorRegistration from '../imports/ui/TutorRegistration';
import Course from '../imports/ui/Course';
import UnityWebgl from '../imports/ui/UnityWebgl';
import MediaPlayer from '../imports/components/student/MediaPlayer';
import CoursesDashboard from '../imports/ui/CoursesDashboard';
import CoursesList from '../imports/components/tutor/CoursesList';
import TutorRequestList from '../imports/components/administrator/TutorRequestList';

const history = createBrowserHistory();

window.browserHistory = history;

Tracker.autorun(() => {

});



Meteor.startup(() => {
  ReactDOM.render(
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} history={history}/>
        <Route exact path="/authoringTool" component={AuthoringTool} history={history}/>
        <Route exact path="/test" component={Test} history={history}/>
        <Route exact path="/tutorRegistration" component={TutorRegistration} history={history}/>
        <Route exact path="/unityWebgl" component={UnityWebgl} history={history}/>
        <Route exact path="/course" component={Course} history={history}/>
        <Route exact path="/media" component={MediaPlayer} history={history}/>
        <Route exact path="/dashboard" component={CoursesDashboard} history={history}/>
        <Route exact path="/myCourses" component={CoursesList} history={history}/>
        <Route exact path="/tutorRequests" component={TutorRequestList} history={history}/>
      </Switch>
    </Router>, document.getElementById('render-target')
  );
});
