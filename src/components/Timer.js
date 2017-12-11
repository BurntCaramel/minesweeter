import React, { Component } from 'react'
import HeaderCounter from './HeaderCounter'

class Timer extends Component {
  render() {
    const { startedAt, finishedAt } = this.props
    const upper = finishedAt || Date.now()
    const secondsElapsed = Math.min(
      (startedAt == null) ? 999 : Math.floor((Math.max(upper - startedAt, 0)) / 1000),
      999 // Cap at 999 seconds
    )
    return <HeaderCounter count={ secondsElapsed } />
  }

  start() {
    this.intervalID = setInterval(() => {
      this.forceUpdate()
    }, 1000)
  }

  stop() {
    if (this.intervalID == null) {
      return
    }

    clearInterval(this.intervalID)
    delete this.intervalID
  }

  componentDidMount() {
    if (this.props.startedAt != null) {
      this.start()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.startedAt != null && prevProps.startedAt == null) {
      this.start()
    }
    else if (this.props.startedAt == null && prevProps.startedAt != null) {
      this.stop()
    }
    else if (this.props.finishedAt != null && prevProps.finishedAt == null) {
      this.stop()
    }
  }

  componentWillUnmount() {
    this.stop()
  }
}

export default Timer