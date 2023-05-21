<img src="public/logo192.png" alt="logo" align="right"/>

# Code Haven

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
[![Netlify Status](https://api.netlify.com/api/v1/badges/018866ef-7a96-4228-be7e-459f6e4a90a8/deploy-status)](https://app.netlify.com/sites/codehaven/deploys)

Welcome to Code Haven, a tool to practice K1, K2, K3, and random substitution Aristocrats, Patristocrats, and Xenocrypts
for the Codebusters Science Olympiad event. The aim of this tool is to mimic a problem on a real Codebusters test as
closely as possible (while still being convenient to use).

> **Note:** Xenocrypts are English quotes translated into Spanish and may not always be accurate. Keyword alphabets will
> always encode with an English keyword

> **Note:** Not compatible with mobile; requires a physical keyboard

## Entering Text

To start solving a problem, select a letter by clicking the box under the ciphertext letter. Use the keyboard to type a
letter, which will be entered for all instances of the selected letter. The selected element will then advance to the
next empty letter.
> ***Note:** to type Ñ for Xenocrypts, press the `~` (tilde) key*

| Color                                               | Meaning                                                                         |
|-----------------------------------------------------|---------------------------------------------------------------------------------|
| ![Selected Letter](tutorial_images/selected.png)    | Currently selected element                                                      |
| ![Same Letter](tutorial_images/same_letter.png)     | Same letter as the selected letter,<br/> but not the currently selected element |
| ![Unelected Letter](tutorial_images/unselected.png) | Unselected letter                                                               |

## Completing a Problem

Once a problem has been completed, press the `[Enter]` or `[Return]` key. If the entered solution is correct, an alert
will appear with the solution and the time taken to solve the problem.

![Alert](tutorial_images/alert.png)

## Tools

There are five tools available in CodeHaven to make solving ciphers easier

### Pattern Marking

Clicking the ciphertext letters (in gray) on any cipher will mark this letter in blue to more easily recognize repeating
patterns, especially helpful for Patristocrats

![Pattern Marking](tutorial_images/pattern_marking.png)

### Word Breaks

Only for Patristocrats, clicking in between two letters will create a separation between these letters, signifying a
break between words for increased readability

![Word Breaks](tutorial_images/word_breaks.png)

### Autocheck

When autocheck is enabled by clicking the checkbox at the top, incorrect letters will be highlighted in red in both the
cipher and the frequency table at the bottom

![Autocheck Letter](tutorial_images/autocheck.png)
![Autocheck Table](tutorial_images/autocheck_table.png)

### Hint

When the hint button is pressed, one correct letter will be inputted into the cipher, starting with vowels and followed
by consonants in order of frequency in the English or Spanish language

![Hint](tutorial_images/hint.gif)

### Reset

When the reset button is pressed, the entire text of the cipher is removed, but marked patterns will remain

![Reset](tutorial_images/reset.gif)