import React, { Component } from 'react';

import { Accounts } from 'meteor/accounts-base';

import AppBar from '../../components/navigation/AppBar';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../style/theme';
import Loading from '../../components/tools/Loading';
import { Courses } from '../../../lib/CourseCollection';
import Table from '../tutor/Table';
import UserCard from './UserCard';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import TabIcon from '@material-ui/icons/Tab';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

export default class TutorRequestList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorRequests: [],
      loading: true,
      open: false,
      dialog: {
        title: '',
      }
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.getRequests();
  }

  getRequests = () => {
    Tracker.autorun(() => {
      Meteor.call("GetTutorRequests", (error, response) =>  {
        this.setState({
          tutorRequests: response,
        }, () => {
          this.createTableData(this.state.tutorRequests);
        })
      });
    });
  }

  approveRequest = (_id) => {
    let tutorRequests = this.state.tutorRequests;
    const index = tutorRequests.findIndex(tutor => tutor._id === _id);
    this.setState({
      selected: index,
      dialog: {
        title: "Approve request",
        action: "approve",
      }
    }, () => {
      this.handleClickOpen();
    })
  }

  fullInformation = (_id) => {
    let tutorRequests = this.state.tutorRequests;
    const index = tutorRequests.findIndex(tutor => tutor._id === _id);
    this.setState({
      selected: index,
      dialog: {
        title: "User information",
        action: "information",
      }
    }, () => {
      this.handleClickOpen();
    })
  }

  createTableData = (tutorRequests) => {
    let tableData = [];
    let headRows = [
      { id: 'fullname', numeric: false, disablePadding: true, label: 'Full Name' },
      { id: 'username', numeric: true, disablePadding: false, label: 'Username' },
      { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
      { id: 'actions', numeric: true, disablePadding: false, label: 'Actions' },
    ];
    let menuOptions = [
      {label: "See full information", icon: <TabIcon/>, action: this.fullInformation.bind(this)},
      {label: "Approve request" , icon: <ThumbUpAltIcon/>, action: this.approveRequest.bind(this)},
    ];
    tutorRequests.map(tutor => {
      tableData.push({fullname: tutor.profile.fullname, username: tutor.username, email: tutor.emails[0].address, _id: tutor._id})
    })
    this.setState({
      headRows: headRows,
      menuOptions: menuOptions,
      tableData: tableData,
    }, () => {
      this.setState({
        loading: false,
      })
    });
  }

  activateAccount = () => {
    Meteor.call("ActivateAccount", this.state.tutorRequests[this.state.selected]._id, (error, response) =>  {
      console.log(response);
      if (response) {
        this.setState({
          activated: response,
        }, () => {
          this.handleClose();
          this.getRequests();
        })
      }
      else {
        console.log(error);
      }
    });
  }

  render() {
    return(
      <div>
        <MuiThemeProvider theme={theme}>
          <AppBar/>
          <div className="management-container">
            {
              this.state.loading ?
                <div className="loading-course-container">
                  <Loading message="Loading requests..."/>
                </div>
              :
              <div className="management-result-container">
                <p className="management-title">Tutor requests <PersonAddIcon className="management-title-icon"/></p>
                <div className="management-table-container">
                  <Table
                    labels={{pagination: 'Requests per page:', plural: 'requests'}}
                    headRows={this.state.headRows}
                    menuOptions={this.state.menuOptions}
                    tableData={this.state.tableData}
                    refresh={true}
                    refreshAction={this.getRequests.bind(this)}
                  />
                </div>
              </div>
            }
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
              <DialogTitle className="success-dialog-title" id="simple-dialog-title">{this.state.dialog.title}</DialogTitle>
              <div className="center-row">
                {
                  this.state.dialog.action === "information" ?
                    <UserCard
                      user={this.state.tutorRequests[this.state.selected]}
                    />
                  :
                  undefined
                }
                {
                  this.state.dialog.action === "approve" ?
                    <div>
                      <DialogContentText style={{padding: "0 1vw"}}>Are you sure you want to approve this request?</DialogContentText>
                      <DialogActions>
                        <Button onClick={() => this.activateAccount()} color="primary">Yes</Button>
                        <Button onClick={() => this.handleClose()} color="primary">No</Button>
                      </DialogActions>
                    </div>
                  :
                  undefined
                }
              </div>
            </Dialog>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}
