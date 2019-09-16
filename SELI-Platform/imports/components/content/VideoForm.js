import React from 'react';
import FileUpload from '../files/FileUpload';
import VideoPreview from '../files/previews/VideoPreview';
import Editor from '../inputs/editor/Editor';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Library from '../tools/Library';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import HttpIcon from '@material-ui/icons/Http';
import ReactPlayer from 'react-player';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import Fab from '@material-ui/core/Fab'

export default class VideoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLibrary: false,
      attributes: {
        video: undefined,
        source: 'upload',
        title: '',
        externalLink: '',
        hasDescription: true,
        description: '',
      }
    }
  }

  handleChange = name => event => {
    let attributes = this.state.attributes;
    if (name === "description") {
      attributes.hasDescription = !attributes.hasDescription;
    }
    if (name === "title") {
      attributes.title = event.target.value;
    }
    if (name === "externalLink") {
      attributes.externalLink = event.target.value;
    }
    this.setState({
      attributes: attributes,
    }, () => console.log(this.state.attributes));
  }

  getInnerHtml(innerHTML){
    let attributes = this.state.attributes;
    attributes.description = innerHTML;
    this.setState({
      attributes: attributes,
    });
  }

  getVideoAttributes(){
    let videoContent = this.state.attributes;
    if (this.validateContent(videoContent) ) {
      return videoContent;
    }
    else {
      return undefined;
    }
  }

  validateContent(content) {
    if (content.title === '') {
      console.log("required");
      return false;
    }
    if (content.video === undefined) {
      console.log("upload or url");
      return false;
    }
    if (content.hasDescription && content.description === '') {
      console.log("enter a description or turn off");
      return false;
    }
    return true;
  }

  getFileInformation(file){
    let attributes = this.state.attributes;
    attributes.video = file;
    this.setState({
      attributes: attributes,
      showPreview: true,
      showGallery: false,
    });
  }

  unPickFile(){
    let attributes = this.state.attributes;
    attributes.video = undefined;
    this.setState({
      showPreview: false,
      attributes: attributes,
    })
  }

  showLibrary(){
    this.setState({
      showGallery: true,
    })
  }

  hideLibrary(){
    this.setState({
      showGallery: false,
    })
  }

  urlHandleChange = name => event => {
    this.setState({
      showHelperText: false,
      url: event.target.value,
      validUrl: false,
    })
  }

  validateUrl(){
    let attributes = this.state.attributes;
    let url = document.getElementById('url-input').value;
    let isValid = ReactPlayer.canPlay(url);
    let helperColor = '';
    let showHelperText = true;
    let urlMessage = '';
    if (isValid) {
      let video = {
        name: 'External video',
        link: url,
      };
      attributes.video = video;
      urlMessage = "The player can reproduce this type of source";
      helperColor = "#4caf50";
    }
    else {
      attributes.video = video;
      urlMessage = "The player can't reproduce this type of source";
      helperColor = "#f44336";
    }
    this.setState({
      showHelperText: showHelperText,
      urlMessage: urlMessage,
      helperColor: helperColor,
      validUrl: isValid,
      url: url,
      attributes: attributes,
    });
  }

  selectType(value){
    let attributes = this.state.attributes;
    attributes.source = value;
    this.setState({
      attributes: attributes,
    });
  }

  componentDidMount(){
    this.props.getVideoAttributesFunction(() => this.getVideoAttributes());
  }

  render() {
    return(
      <div>
        {
          this.state.attributes.source === "upload" && !this.state.showGallery ?
            <div className="media-gallery-tab-button-container">
              <Fab onClick={() => this.showLibrary()}>
                <FolderSpecialIcon/>
              </Fab>
              <p className="media-fab-text">Open library</p>
            </div>
          :
          undefined
        }
        {
          !this.state.showGallery ?
            <div id="dialog-max-height" className="dialog-form-container-large">
              <Paper square>
                <Tabs
                  color="primary"
                  value={this.state.attributes.source}
                  indicatorColor="primary"
                  textColor="primary"
                  className="form-tabs-container"
                  variant="fullWidth"
                  centered={true}
                >
                  <Tab value={'upload'} onClick={() => this.selectType('upload')} className="form-tab" label="By upload" icon={<CloudUploadIcon />} />
                  <Tab value={'url'} onClick={() => {this.selectType('url'); this.unPickFile()}} className="form-tab" label="By Url" icon={<HttpIcon />} />
                </Tabs>
              </Paper>
              <div className="dialog-columns-container">
                <div className="course-creator-file-form-column">
                  {
                    !this.state.showPreview ?
                      <div className="form-file-container">
                        {
                          this.state.attributes.source === "upload" ?
                            <FileUpload
                              type="video"
                              accept={'video/*'}
                              label={'Click the button to upload a video'}
                              getFileInformation={this.getFileInformation.bind(this)}
                            />
                          :
                          <div>
                            {
                              this.state.validUrl ?
                                <ReactPlayer className="course-creator-preview-player" url={this.state.url}/>
                              :
                                undefined
                            }
                            <div className="url-input-container">
                              <TextField
                                id="url-input"
                                label="Url"
                                margin="normal"
                                variant="outlined"
                                value={this.state.url}
                                required
                                onChange={this.urlHandleChange()}
                                className="url-input"
                                helperText={ this.state.showHelperText ? <div className="url-helper-text" style={{color: this.state.helperColor}}>{this.state.urlMessage}</div> : undefined }
                              />
                            </div>
                            <div className="margin-center-row">
                              <Button onClick={() => this.validateUrl()} className="url-check-button" color="primary">Test source</Button>
                            </div>
                          </div>
                        }
                      </div>
                    :
                    <VideoPreview
                      file={this.state.attributes.video}
                      unPickFile={this.unPickFile.bind(this)}
                    />
                  }
                </div>
                <div className="course-creator-form-column">
                  <div className="course-creator-input-container">
                    <TextField
                      id="title-input"
                      label="Video title"
                      margin="normal"
                      variant="outlined"
                      value={this.state.attributes.title}
                      onChange={this.handleChange('title')}
                      required
                      className="form-padding-dialog-input"
                    />
                    <TextField
                      id="link-input"
                      label="External link"
                      value={this.state.attributes.externalLink}
                      onChange={this.handleChange('externalLink')}
                      margin="normal"
                      variant="outlined"
                      className="form-padding-dialog-input"
                    />
                    <div className="margin-center-row">
                      <FormGroup>
                        <FormControlLabel
                          control={<Switch size="small" onChange={this.handleChange('description')} checked={this.state.attributes.hasDescription}/>}
                          label={<p className="form-label">Video with text description</p>}
                        />
                      </FormGroup>
                    </div>
                    <div style={this.state.attributes.hasDescription ? undefined :{pointerEvents: "none", userSelect: "none"}} className="editor-block">
                      <Editor
                        areaHeight='20vh'
                        innerHTML={this.state.attributes.description}
                        buttonLabels={false}
                        addLinks={true}
                        getInnerHtml={this.getInnerHtml.bind(this)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          :
          <Library
            user={"MyUser"}
            type={"video"}
            getFileInformation={this.getFileInformation.bind(this)}
            hideLibrary={this.hideLibrary.bind(this)}
          />
        }
      </div>
    );
  }
}
