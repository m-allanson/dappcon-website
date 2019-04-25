import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import IdleTimer from 'react-idle-timer'
import { EthInvader, DappconInvader, EthLinesInvader } from 'components/Svg'

const InvaderIcons = [EthInvader, DappconInvader, EthLinesInvader]

const colors = ['#ff294e', '#f7834e', '#f3c132']

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

const InvaderContainer = styled.div.attrs(({ top, left, ...props }) => ({
  style: {
    top: `${top}px`,
    left: `${left}px`,
    ...props,
  },
}))`
  position: fixed;
  z-index: 2;
`

const Invaders = () => {
  const [width, setWidth] = useState(1600)
  const [height, setHeight] = useState(900)
  const [isInvading, setIsInvading] = useState(false)
  const [invaders, setInvaders] = useState([])

  useEffect(() => {
    let id
    let invadersDisplayed = 0
    function addInvader() {
      if (invadersDisplayed === 150) {
        clearInterval(id)
      }

      ++invadersDisplayed
      setInvaders(invaders => [
        ...invaders,
        {
          icon: InvaderIcons[Math.round(getRandomArbitrary(0, InvaderIcons.length - 1))],
          top: getRandomArbitrary(20, height - 60),
          left: getRandomArbitrary(20, width - 60),
          color: colors[Math.round(getRandomArbitrary(0, colors.length - 1))],
        },
      ])
    }

    if (isInvading) {
      id = setInterval(addInvader, 800)

      return () => clearInterval(id)
    }
  }, [isInvading, width, height])

  const updateScreenSize = () => {
    if (typeof window !== 'undefined') {
      setInvaders([])

      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }
  }

  useEffect(() => {
    updateScreenSize()

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateScreenSize)
    }

    return () => {
      window.removeEventListener('resize', updateScreenSize)
    }
  }, [])

  return (
    <>
      <IdleTimer
        onActive={() => {
          setIsInvading(false)
          setInvaders([])
        }}
        onIdle={() => {
          setIsInvading(true)
        }}
        timeout={2000}
        startOnLoad
      />
      {invaders.map((Invader, i) => {
        return (
          <InvaderContainer
            key={i}
            style={{
              top: Invader.top,
              left: Invader.left,
            }}
          >
            <Invader.icon fill={Invader.color} />
          </InvaderContainer>
        )
      })}
    </>
  )
}

export default Invaders
