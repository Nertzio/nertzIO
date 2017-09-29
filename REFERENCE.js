/*
Board
  - all players' sections
	- 13-card stack
		- stack
			- cards
	- 39-card stack
		- stack
			-cards
	- discard pile
		- stack
			-cards
	- 4 solitaire stack spaces
		- stacks
			- cards
  - field/grid
	- cells
		- stack (empty)


*/

export default {
  games: {
    'asdf23452': { // all games have uid; use nertz.io/play/asdf23452
      'boardCells': {
        1: [{
            'belongsTo': 1, // player number
            'suit': 'heart',
            'number': 1,
            'name': 'ace',
            'isFaceUp': true,
            'x': 0.3,
            'y': 0.725,
            'z': 5,
          },
          {
            'belongsTo': 3,
            'suit': 'heart',
            'number': 2,
            'name': 2,
            'isFaceUp': true,
            'x': 0.3,
            'y': 0.725,
            'z': 5,
          },
          {
            'belongsTo': 2,
            'suit': 'heart',
            'number': 3,
            'name': 3,
            'isFaceUp': true,
            'x': 0.3,
            'y': 0.725,
            'z': 5,
          }],
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null,
        8: null,
        9: null,
        10: null,
        11: null,
        12: null,
        13: null,
        14: null,
        15: null,
        16: null,
      },
      players: {
        '1': { // all games have players 1-4
          'uid': 6346, //  uid from firebase.auth().currentUser
          'username': 'neatGuy',
          'email': 'neatguy@email.com',
          'score': null, // calculate at gameover
          'cardStacks': {
            'main': [{
              'belongsTo': 1, // player number
              'suit': 'heart',
              'number': 1,
              'name': 'ace',
              'isFaceUp': true,
              'x': 0.3,
              'y': 0.725,
              'z': 5,
            }],
            'discard': [{
              'belongsTo': 1, // player number
              'suit': 'heart',
              'number': 1,
              'name': 'ace',
              'isFaceUp': true,
              'x': 0.3,
              'y': 0.725,
              'z': 5,
            },],
            'small': [{
              'belongsTo': 1, // player number
              'suit': 'heart',
              'number': 1,
              'name': 'ace',
              'isFaceUp': true,
              'x': 0.3,
              'y': 0.725,
              'z': 5,
            },],
            's1': [{
              'belongsTo': 1, // player number
              'suit': 'heart',
              'number': 1,
              'name': 'ace',
              'isFaceUp': true,
              'x': 0.3,
              'y': 0.725,
              'z': 5,
            },],
            's2': [{
              'belongsTo': 1, // player number
              'suit': 'heart',
              'number': 1,
              'name': 'ace',
              'isFaceUp': true,
              'x': 0.3,
              'y': 0.725,
              'z': 5,
            },],
            's3': [{ // solitaire stack 3
              '17S': {
                'isFaceUp': true,
                'x': 0.3,
                'y': 0.725,
                'z': 5,
              },
            }],
            's4': [{ // solitaire stack 4
              '18C': {
                'isFaceUp': true,
                'x': 0.3,
                'y': 0.725,
                'z': 5,
              },
            }],
          },
        },
        '2': { // all games have players 1-4
          'uid': 7845, //  uid from firebase.auth().currentUser
          'username': 'neatGal',
          'email': 'neatgal@email.com',
          'score': null, // calculate at gameover
          'cardStacks': {
            'main': [{ // 37-card deck
              '2AC': { // uid formula: 1 = p1, A = Ace, C = Clubs
                'isFaceUp': true, // determines which side renders
                'x': 0.3, // * user screen width = x-pixel position
                'y': 0.725, // * user screen width = y-pixel position
                'z': 5, // sets css z-index property
              },
            }],
            'discard': [{ // 3-card flip discard pile; top card available
              '2KD': {
                'isFaceUp': true,
                'x': 0.3,
                'y': 0.725,
                'z': 5,
              },
            }],
            'small': [{ // 13-card deck
              '2QH': {
                'isFaceUp': true,
                'x': 0.3,
                'y': 0.725,
                'z': 5,
              },
            }],
            's1': [{ // solitaire stack 1
              '2KD': {
                'isFaceUp': true,
                'x': 0.3,
                'y': 0.725,
                'z': 5,
              },
            }],
            's2': [{ // solitaire stack 2
              '2JH': {
                'isFaceUp': true,
                'x': 0.3,
                'y': 0.725,
                'z': 5,
              },
            }],
            's3': [{ // solitaire stack 3
              '27S': {
                'isFaceUp': true,
                'x': 0.3,
                'y': 0.725,
                'z': 5,
              },
            }],
            's4': [{ // solitaire stack 4
              '28C': {
                'isFaceUp': true,
                'x': 0.3,
                'y': 0.725,
                'z': 5,
              },
            }],
          },
        },
        '3': { // all games have players 1-4
          'uid': 6356, //  uid from firebase.auth().currentUser
          'username': 'radBro',
          'email': 'radBro@email.com',
          'score': null, // calculate at gameover
          'cardStacks': {
            'main': [{ // 37-card deck
              '3AC': { // uid formula: 1 = p1, A = Ace, C = Clubs
                'isFaceUp': true, // determines which side renders
                'x': 0.3, // * user screen width = x-pixel position
                'y': 0.725, // * user screen width = y-pixel position
                'z': 5, // sets css z-index property
              },
            }],
            'discard': [{ // 3-card flip discard pile; top card available
              '3KD': {
                'isFaceUp': true,
                'x': 0.3,
                'y': 0.725,
                'z': 5,
              },
            }],
            'small': [{ // 13-card deck
              '3QH': {
                'isFaceUp': true,
                'x': 0.3,
                'y': 0.725,
                'z': 5,
              },
            }],
            's1': [{ // solitaire stack 1
              '3KD': {
                'isFaceUp': true,
                'x': 0.3,
                'y': 0.725,
                'z': 5,
              },
            }],
            's2': [{ // solitaire stack 2
              '3JH': {
                'isFaceUp': true,
                'x': 0.3,
                'y': 0.725,
                'z': 5,
              },
            }],
            's3': [{ // solitaire stack 3
              '37S': {
                'isFaceUp': true,
                'x': 0.3,
                'y': 0.725,
                'z': 5,
              },
            }],
            's4': [{ // solitaire stack 4
              '38C': {
                'isFaceUp': true,
                'x': 0.3,
                'y': 0.725,
                'z': 5,
              },
            }],
          },
        },
        '4': { // all games have players 1-4
          'uid': 7275, //  uid from firebase.auth().currentUser
          'username': 'catLady',
          'email': 'catLady@email.com',
          'score': null, // calculate at gameover
          'cardStacks': {
            'main': [{ // 37-card deck
              '4AC': { // uid formula: 1 = p1, A = Ace, C = Clubs
                'isFaceUp': true, // determines which side renders
                'x': 0.3, // * user screen width = x-pixel position
                'y': 0.725, // * user screen width = y-pixel position
                'z': 5, // sets css z-index property
              },
            }],
            'discard': [{ // 3-card flip discard pile; top card available
              '4KD': {
                'isFaceUp': true,
                'x': 0.3,
                'y': 0.725,
                'z': 5,
              },
            }],
            'small': [{ // 13-card deck
              '4QH': {
                'isFaceUp': true,
                'x': 0.3,
                'y': 0.725,
                'z': 5,
              },
            }],
            's1': [{ // solitaire stack 1
              '4KD': {
                'isFaceUp': true,
                'x': 0.3,
                'y': 0.725,
                'z': 5,
              },
            }],
            's2': [{ // solitaire stack 2
              '4JH': {
                'isFaceUp': true,
                'x': 0.3,
                'y': 0.725,
                'z': 5,
              },
            }],
            's3': [{ // solitaire stack 3
              '47S': {
                'isFaceUp': true,
                'x': 0.3,
                'y': 0.725,
                'z': 5,
              },
            }],
            's4': [{ // solitaire stack 4
              '48C': {
                'isFaceUp': true,
                'x': 0.3,
                'y': 0.725,
                'z': 5,
              },
            }],
          },
        },
      }
    },
  },
  'pastGames': {} // maybe store past games for score boards? or use postgres?
}
