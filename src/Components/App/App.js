import React from 'react'
import './App.css'
import Nav from '../Nav/Nav'
import Landing from '../Landing/Landing'
import Footer from '../Footer/Footer'
import { SAMPLE_PARAGRAPHS } from '../../data/SampleParagraph'
import ChallengeSection from '../ChallengeSection/ChallengeSection'

const totalTime = 60
const serviceUrl = 'http://metaphorpsum.com/paragraphs/1/9'
const defaultState = {
  selectedParagraph: '',
  timerStarted: false,
  timeRemaining: totalTime,
  words: 0,
  characters: 0,
  wpm: 0,
  testInfo: [],
}

class App extends React.Component {
  state = defaultState

  fetchNewParagraphFallback = () => {
    const data =
      SAMPLE_PARAGRAPHS[Math.floor(Math.random() * SAMPLE_PARAGRAPHS.length)]
    const selectedParagraphArray = data.split('')
    const testInfo = selectedParagraphArray.map((selectedLetter) => {
      return {
        testLetter: selectedLetter,
        status: 'notAttempted',
      }
    })
    this.setState({ ...defaultState, testInfo, selectedParagraph: data })
  }

  fetchNewParagraph = () => {
    fetch(serviceUrl)
      .then((response) => response.text())
      .then((data) => {
        const selectedParagraphArray = data.split('')
        const testInfo = selectedParagraphArray.map((selectedLetter) => {
          return {
            testLetter: selectedLetter,
            status: 'notAttempted',
          }
        })
        this.setState({ ...defaultState, testInfo, selectedParagraph: data })
      })
  }

  componentDidMount() {
    this.fetchNewParagraphFallback()
  }

  startTimer = () => {
    this.setState({ timerStarted: true })
    setInterval(() => {
      if (this.state.timeRemaining > 0) {
        // change the wpm
        const timeSpent = totalTime - this.state.timeRemaining
        const wpm =
          timeSpent > 0 ? (this.state.words / timeSpent) * totalTime : 0
        this.setState({
          timeRemaining: this.state.timeRemaining - 1,
          wpm: parseInt(wpm),
        })
      } else {
        clearInterval()
      }
    }, 1000)
  }
  startAgain = () => this.fetchNewParagraph()
  handleUserInput = (inputValue) => {
    if (!this.state.timerStarted) this.startTimer()
    /**
     * 1.Handle the underflow case - all the characters should be shown as not apptemped-early exit
     * 2.Handle the overflow case - early exit
     * 3.Handle the backspace 
     *    - Mark the [index-1] element was not attempted (irrespective of whether the index is less than 0)
     *    - But, don't forgot to check for the overflow case here (index+1 -> out of bound, when the index ==       length-1)
     *4. Update the status in the testInfo
          - Find the last character in the inputValue and it's index
          - Check if the character at same index in testInfo (state) matches
          - Yes -> "correct"
          -No ->"InCorrect"
      *5. Irrespected of the case, characters, words, and space (wpm) can be updated
     */

    const characters = inputValue.length
    const words = inputValue.split(' ').length
    const index = characters - 1

    if (index < 0) {
      this.setState({
        testInfo: [
          {
            testLetter: this.state.testInfo[0].testLetter,
            status: 'notAttempted',
          },
          ...this.state.testInfo.slice(1),
        ],
        characters,
        words,
      })

      return
    }

    if (index >= this.state.selectedParagraph.length) {
      this.setState({
        characters,
        words,
      })
      return
    }

    // Make a copy
    const testInfo = this.state.testInfo
    if (!(index === this.state.selectedParagraph.length - 1))
      testInfo[index + 1].status = 'notAttempted'

    // Check for mistake
    const isMistake = inputValue[index] === testInfo[index].testLetter

    // Update the testInfo
    testInfo[index].status = isMistake ? 'correct' : 'incorrect'

    // Update the state
    this.setState({
      testInfo,
      words,
      characters,
    })
  }

  render() {
    return (
      <div className='app'>
        {/* Nav Section */}
        <Nav />
        {/* Landing Page */}
        <Landing />
        {/* Challange Section */}
        <ChallengeSection
          selectedParagraph={this.state.selectedParagraph}
          words={this.state.words}
          characters={this.state.characters}
          wpm={this.state.wpm}
          timeRemaining={this.state.timeRemaining}
          timerStarted={this.state.timerStarted}
          testInfo={this.state.testInfo}
          onInputChange={this.handleUserInput}
          startAgain={this.startAgain}
        />
        {/* Footer */}
        <Footer />
      </div>
    )
  }
}

export default App
