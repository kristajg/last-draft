/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import React, {Component} from 'react'
import insertDataBlock from '../../utils/insertDataBlock'
import styled from 'styled-components'

export default class extends Component {
  getVideoIdYoutube(str) {
    // link : https://youtube.com/watch?v=HBHJ0XGZfLs
    // share : https://youtu.be/HBHJ0XGZfLs
    // embed : https://youtube.com/embed/HBHJ0XGZfLs
    var re = /\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9_\-]+)/i
    var matches = re.exec(str)
    return matches && matches[1]
  }

  getVideoIdVimeo(str) {
    // embed & link: https://vimeo.com/713300
    var re = /\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i
    var matches = re.exec(str)
    return matches && matches[1]
  }


  getVideoUrl(src) {
    /* youtube */
    let id = this.getVideoIdYoutube(src)
    if (id !== null) {
      return `https://youtube.com/embed/${id}`
    }

    /* vimeo */
    id = this.getVideoIdVimeo(src)
    if (id !== null) {
      return `https://player.vimeo.com/video/${id}`
    }
    return '';
  }

  onClick (e) {
    e.preventDefault()
    const src = window.prompt('Enter the video URL')
    if (!src) { return }

    let videoSrc = this.getVideoUrl(src)
    if(videoSrc === undefined) { return }

    const data = {src: videoSrc, type: 'video'}
    this.props.onChange(insertDataBlock(this.props.editorState, data))
  }

  render () {
    return (
      <VideoButton type='button' onClick={::this.onClick} className='ld-video-block-button'>
        <VideoIcon width='24' height='24' className='ld-button-video'>
          <path fill='currentColor' d='M10 9v6l5-3-5-3zm8.222-3H5.778C4.8 6 4 6.6 4 7.333v9.334C4 17.4 4.8 18 5.778 18h12.444C19.2 18 20 17.4 20 16.667V7.333C20 6.6 19.2 6 18.222 6z' fillRule='evenodd' />
        </VideoIcon>
      </VideoButton>
    )
  }
}

const VideoButton = styled.button`
  background: none;
  border: 0;
  color: #fff;
  cursor: pointer;
  height: 24px;
  font-size: 0;
  padding: 0;
  width: 24px;
  transition: all 0.5s ease;
  position: relative;
  background: none;

  &:before {
    transition: all 0.1s ease-in-out;
    background-color: #181818;
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 100%;
    display: inline-block;
    background-color: #181818;
  }
  &:focus {
    outline: none;
  }
`

const VideoIcon = styled.svg`
  position: absolute;
  transform: scale(0.8);
  top: 0;
  left: 0;
`
