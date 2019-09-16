import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TimerIcon from '@material-ui/icons/Timer';
import BookIcon from '@material-ui/icons/Book';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';

import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import Roll from 'react-reveal/Roll';

import CourseCarousel from './CourseCarousel';
import TechnicalRequirement from './TechnicalRequirement';
import CourseNavigation from './CourseNavigation';

var ColorThief = require('color-thief');

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class CoursePresentation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: this.props.course,
      mainColor: '',
      palette: ['', '', '', ''],
    }
  }

  componentDidMount() {
    this.getImageColors();
  }

  getImageColors() {
    var colorThief = new ColorThief();
    var courseImage = new Image(500, 500);
    courseImage.src = this.props.course.image.link;
    let self = this;
    courseImage.addEventListener('load', function() {
      let mainColor = colorThief.getColor(courseImage);
      mainColor = self.fullColorHex(mainColor[0], mainColor[1], mainColor[2]);
      mainColor = `#${mainColor}`;
      let paletteRgb = colorThief.getPalette(courseImage, 3);
      let palette = [];
      for (var i = 0; i < paletteRgb.length; i++) {
        palette.push({
          bgColor: `#${self.fullColorHex(paletteRgb[i][0], paletteRgb[i][1], paletteRgb[i][2])}`,
          textColor: self.getContrastColor(self.fullColorHex(paletteRgb[i][0], paletteRgb[i][1], paletteRgb[i][2])),
        });
      }
      self.setState({
        mainColor: mainColor,
        palette: palette,
      })
    });
  }

  rgbToHex (rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
  };

  fullColorHex(r, g, b) {
    var red = this.rgbToHex(r);
    var green = this.rgbToHex(g);
    var blue = this.rgbToHex(b);
    return red+green+blue;
  };

  getContrastColor(hexColor) {
    var r = parseInt(hexColor.substr(0, 2), 16);
    var g = parseInt(hexColor.substr(2, 2), 16);
    var b = parseInt(hexColor.substr(4, 2), 16);
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#212121' : '#FFFFFF';
  }

  handleClickOpenSylabus = () => {
    this.setState({ openSylabus: true });
  };

  handleCloseSyalbus = () => {
    this.setState({ openSylabus: false });
  };

  handleClickOpenOrganization = () => {
    this.setState({ openOrganization: true });
  };

  handleCloseOrganization = () => {
    this.setState({ openOrganization: false });
  };

  learnMore() {
    var win = window.open("http://seliproject.org/project-overview", '_blank');
    win.focus();
  }

  render() {
    return(
      <div className="course-presentation-container">
        <div
          style={{backgroundImage: `url(${this.props.course.image.link})`}}
          className="course-presentation-title-container"
        >
          <Zoom delay={500} top cascade>
            <p className="course-presentation-title-text">{this.props.course.title}</p>
            <p className="course-presentation-subtitle-text">{this.props.course.subtitle}</p>
          </Zoom>
        </div>
        <Zoom delay={500} duration={3000} bottom>
          <div className="course-presentation-description">
            {this.props.course.description}
          </div>
        </Zoom>
        <div className="course-other-information-container">
          <Fade left>
            <Paper
              elevation={12}
              className="course-card-information"
              style={{
                backgroundColor: this.state.palette[0].bgColor,
                color: this.state.palette[0].textColor,
              }}
            >
              <div className="course-card-title">
                Estimated course duration
              </div>
              <div className="course-card-presentation-content">
                <IconButton className="course-card-presentation-icon-button">
                  <TimerIcon
                    className="course-card-presentation-icon"
                    style={{
                      color: this.state.palette[0].textColor,
                    }}
                  />
                </IconButton>
                <p className="course-card-large-text">{`${this.props.course.duration}h`}</p>
              </div>
            </Paper>
          </Fade>
          <Fade up>
            <Paper
              elevation={12}
              className="course-card-information"
              style={{
                backgroundColor: this.state.palette[1].bgColor,
                color: this.state.palette[1].textColor,
              }}
              onClick={() => this.handleClickOpenSylabus()}
            >
              <div className="course-card-title">
                Course syllabus
              </div>
              <div className="course-card-presentation-content">
                <IconButton className="course-card-presentation-icon-button">
                  <BookIcon
                    className="course-card-presentation-icon"
                    style={{
                      color: this.state.palette[1].textColor,
                    }}
                  />
                </IconButton>
                <p className="course-card-medium-text">{`Click to read`}</p>
              </div>
            </Paper>
          </Fade>
          <Fade right>
            <Paper
              elevation={12}
              className="course-card-information"
              style={{
                backgroundColor: this.state.palette[2].bgColor,
                color: this.state.palette[2].textColor,
              }}
              onClick={() => this.handleClickOpenOrganization()}
            >
              <div className="course-card-title">
                Course organization
              </div>
              <div className="course-card-presentation-content">
                <IconButton className="course-card-presentation-icon-button">
                  <AssignmentIcon
                    className="course-card-presentation-icon"
                    style={{
                      color: this.state.palette[2].textColor,
                    }}
                  />
                </IconButton>
                <p className="course-card-small-text">{`Click to see all ${this.props.course.organization.unit.toLowerCase()}s ${this.props.course.organization.subunit ? `and ${this.props.course.organization.subunit.toLowerCase()}` : undefined}`}</p>
              </div>
            </Paper>
          </Fade>
        </div>
        <div className="course-requirement-information">
          <Roll right>
            <p className="course-requirement-information-title">This course will support the following disabilities:</p>
          </Roll>
          <Fade left>
            <CourseCarousel
              requirements={this.props.course.support}
            />
          </Fade>
          <Fade delay={500} right>
            <div className="course-requirements-disabilities-container">
              <p className="course-requirements-disabilities-title">SELI Overview</p>
              <p className="course-requirements-disabilities-description">SELI courses are created with the objective to be accessible to all types of public</p>
              <Button onClick={() => this.learnMore()} className="course-requirements-accessibility-button" color="secondary">Learn more</Button>
              <div className="course-requirements-accessibility-image"></div>
            </div>
          </Fade>
        </div>
        <div className="course-requirement-information">
          <Roll left>
            <p className="course-requirement-information-title">Also to complete this course you will need:</p>
          </Roll>
          <div className="course-technical-requirements-container">
            {this.props.course.requirements.map((requirement, index) => {
              return(
                <Fade delay={(index + 1) * 250} down>
                  <TechnicalRequirement requirement={requirement}/>
                </Fade>
              )
            })}
          </div>
        </div>
        <div className="course-presentation-footer">
          <p className="course-presentation-copyright-text">Made by SELI Team 2019</p>
        </div>
        <Dialog fullScreen open={this.state.openSylabus} onClose={this.handleCloseSyalbus} TransitionComponent={Transition}>
          <AppBar position="static" className="course-dialog-app-bar">
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={this.handleCloseSyalbus} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography className="course-dialog-title" variant="h6">
                Course sylabus
              </Typography>
            </Toolbar>
          </AppBar>
          <div className="course-dialog-content">
            <object className="pdf-reader" data={this.props.course.sylabus.link} type="application/pdf" width="100%" height="100%"></object>
          </div>
        </Dialog>
        <Dialog open={this.state.openOrganization} onClose={this.handleCloseOrganization} TransitionComponent={Transition}>
          <AppBar position="static" className="course-dialog-app-bar">
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={this.handleCloseOrganization} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography className="course-dialog-title" variant="h6">
                Course organization
              </Typography>
            </Toolbar>
          </AppBar>
          <div className="course-presentation-organization-container">
            <CourseNavigation
              program={this.props.course.program}
              organization={this.props.course.organization}
              navigate={false}
              navigateTo={this.props.navigateTo.bind(this)}
              selected={this.props.selected}
            />
          </div>
        </Dialog>
      </div>
            )
          }
        }
