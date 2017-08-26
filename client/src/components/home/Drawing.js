/**
 * @flow
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import scramby from 'scramby'
import type { State } from '../../types'

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
`

type Props = {
  state: string
}

class Drawing extends Component {
  props: Props

  /**
   * Draw the scramble to the DOM when component has mounted.
   */

  componentDidMount() {
    this.updateDrawing()
  }

  /**
   * Only update if the scramble has changed.
   */

  shouldComponentUpdate(nextProps: Props) {
    return this.props.state !== nextProps.state
  }

  /**
   * Redraw to the DOM when the scramble has changed.
   */

  componentDidUpdate() {
    this.updateDrawing()
  }

  /**
   * Clears the previous scramble and redraws it based on the new scramble.
   */

  updateDrawing() {
    const { state } = this.props
    const { drawing } = this.refs
    const scrambler = scramby()

    drawing.innerHTML = ''
    scrambler.drawScramble(drawing, state, 300, 180)
  }

  /**
   * Display the drawing.
   */

  render() {
    return (
      <FlexBox>
        <div ref="drawing" />
      </FlexBox>
    )
  }
}

function mapStateToProps(state: State) {
  if (!state.scramble.currScramble) {
    return {}
  }

  return {
    state: state.scramble.currScramble.state
  }
}

export default connect(mapStateToProps)(Drawing)