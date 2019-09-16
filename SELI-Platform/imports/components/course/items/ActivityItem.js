import React from 'react';
import Divider from '@material-ui/core/Divider';
import MenuItem from './MenuItem';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

export default class ActivityItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: 'activity-panel',
    }
  }

  handleChange = panel => (event, isExpanded) => {
    this.setState({
      expanded: isExpanded ? panel : false
    });
    let item = this.props.item;
    item.attributes.expanded = !item.attributes.expanded;
  }

  componentDidMount(){

  }

  render() {
    return(
      <div className="content-box">
        {
          this.props.item.attributes !== undefined ?
            <div className="activity-content-item">
              <div>
                <div className="activity-item-container">
                  <div className="activity-container">
                    <ExpansionPanel
                      defaultExpanded
                      expanded={this.props.item.attributes.expanded}
                      onChange={this.handleChange('activity-panel')}
                      className="item-quiz-panel"
                    >
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1c-content"
                        id={this.props.item.id}
                        className="item-quiz-expansion-summary"
                      >
                        <div className="item-quiz-expansion-summary-text-container">
                          <Typography className="activity-panel-title">Activity</Typography>
                          <Typography className="quiz-panel-subtitle">
                            { this.props.item.attributes.type === 'storyboard' ? "Storytelling activity" : undefined }
                            { this.props.item.attributes.type === 'upload' ? "Upload file activity" : undefined }
                            { this.props.item.attributes.type === 'text' ? "Text section activity" : undefined }
                          </Typography>
                        </div>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails className="item-quiz-detail">
                        <div className="item-quiz-detail-container">
                          <p className="activity-instruction-title">Instructions:</p>
                          <div className="activity-item-container-instruction">
                            {this.props.item.attributes.instruction}
                          </div>
                          {
                            this.props.item.attributes.type === 'upload' ?
                              <div className="activity-detail-container">
                                <Typography className="item-quiz-text-detail" variant="overline" display="block" gutterBottom>
                                  Accepted file types:
                                </Typography>
                                {
                                  this.props.item.attributes.fileTypes.map (fileType => {
                                    return(
                                      <div>
                                        {
                                          fileType.selected ?
                                            <Typography className="file-type-text-detail" variant="overline" display="block" gutterBottom>
                                              {fileType.label}
                                            </Typography>
                                          :
                                          undefined
                                        }
                                      </div>
                                    )
                                  })
                                }
                              </div>
                            :
                            undefined
                          }
                        </div>
                      </ExpansionPanelDetails>
                      <Divider />
                      <ExpansionPanelActions className="quiz-item-actions">
                        <Button size="medium">
                          Set reminder
                        </Button>
                        <Button size="medium" color="primary">
                          Start
                        </Button>
                      </ExpansionPanelActions>
                    </ExpansionPanel>
                  </div>
                </div>
              </div>
            </div>
          :
          undefined
        }
        <div className="menu-content-item">
          <MenuItem
            item={this.props.item}
            removeItem={this.props.removeItem.bind(this)}
          />
        </div>
      </div>
      );
    }
  }
