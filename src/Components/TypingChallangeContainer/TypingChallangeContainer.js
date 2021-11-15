import React from 'react'
import './TypingChallangeContainer.css'
import TypingChallenge from '../TypingChallenge/TypingChallenge'
import ChallengeDetailsCards from '../ChallengeDetailsCards/ChallengeDetailsCards'

const TypingChallangeContainer = ({
  selectedParagraph,
  words,
  characters,
  wpm,
  timeRemaining,
  timerStarted,
  testInfo,
  onInputChange,
}) => {
  console.log('inside ', testInfo)
  return (
    <div className='typing-challenge-container'>
      {/* Details section */}

      <div className='details-container'>
        {/* words type */}
        <ChallengeDetailsCards cardName='Words' cardValue={words} />

        {/* character typed */}
        <ChallengeDetailsCards cardName='Characters' cardValue={characters} />

        {/* speed */}
        <ChallengeDetailsCards cardName='Speed' cardValue={wpm} />
      </div>

      {/* The real challenge */}
      <div className='typewriter-container'>
        <TypingChallenge
          timerStarted={timerStarted}
          timeRemaining={timeRemaining}
          selectedParagraph={selectedParagraph}
          testInfo={testInfo}
          onInputChange={onInputChange}
        />
      </div>
    </div>
  )
}

export default TypingChallangeContainer
