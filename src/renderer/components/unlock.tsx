import { default as React, Component } from "react";
import { Grid } from "semantic-ui-react";
import { ipcCommandSender } from '../actions/ipc';

type Prop = {}

export class Unlock extends Component<Prop, {}> {
  componentDidMount() {
    ipcCommandSender.send({command: 'ping'}).then((success) => {
      console.log(`Did it: ${success}`)
    }, (error) => {
      console.log(`Hurgs: ${error}`)
    }
    )
    ipcCommandSender.send({command: 'identities'}).then((success) => {
      console.log(success)
    }, (error) => {
      console.log(`Hurgs: ${error}`)
    }
    )
  }
  render() {
    return (
      <Grid verticalAlign="middle" textAlign="center" columns={1}>
        <Grid.Row>
          <Grid.Column>
            <div>Unlock</div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}