      UNIT_DEFINITIONS = {
        'all' : [
          'barrack',
          'factory',
          'generator',
          'extractor',
          'soldier',
        ],
        'buildings' : [
          'barrack',
          'factory',
          'generator',
          'extractor',
        ],
        'soldier' : {
          'speed' : 3,
          'width' : 1,
          'height' : 1,
          'mod_x' : 0,
          'mod_y' : 0,
          'creation_time' : 150,
          'available_orders': [Move, Attack],
          'max_life' : 50,
          'cost' : {
            'energy' : 20,
            'matter' : 10,
          }
        },
        'barrack' : {
          'speed' : 0,
          'width' : 3,
          'height' : 3,
          'mod_x' : 0,
          'mod_y' : 0,
          'order_start_row_mod' : 3,
          'order_start_col_mod' : 1,
          'available_orders': [Move, Attack, CreateSoldier, CreateScout, CreateBuilder],
          'max_life' : 300,
          'cost' : {
            'energy' : 20,
            'matter' : 10,
          }
        },
        'factory' : {
          'speed' : 0,
          'width' : 3,
          'height' : 3,
          'mod_x' : 0,
          'mod_y' : 0,
          'order_start_row_mod' : 3,
          'order_start_col_mod' : 1,
          'available_orders': [Move, Attack, CreateSoldier, CreateScout, CreateBuilder],
          'max_life' : 450,
          'cost' : {
            'energy' : 40,
            'matter' : 20,
          }
        },
        'generator' : {
          'speed' : 100,
          'width' : 1,
          'height' : 1,
          'mod_x' : 0,
          'mod_y' : -32,
          'order_start_row_mod' : 3,
          'order_start_col_mod' : 1,
          'available_orders': [],
          'max_life' : 100,
          'cost' : {
            'energy' : 20,
            'matter' : 10,
          }
        },
        'extractor' : {
          'speed' : 100,
          'width' : 1,
          'height' : 1,
          'mod_x' : 0,
          'mod_y' : -32,
          'order_start_row_mod' : 3,
          'order_start_col_mod' : 1,
          'available_orders': [],
          'max_life' : 100,
          'cost' : {
            'energy' : 20,
            'matter' : 10,
          }
        }
      };

const game = new Game("A lost cause", MAPS["E1M1"]);

game.create_player('Sarah', 'rgb(0, 128, 255)', 0, 0);
game.create_player('Tom', 'rgb(255, 127, 39)', 2, 2);
game.create_unit('Sarah', 'soldier', 5, 5);
game.create_unit('Sarah', 'soldier', 5, 6);
game.create_unit('Tom', 'soldier', 10, 6);
game.create_building('Sarah', 'barrack', 17, 18);
game.create_building('Sarah', 'generator', 23, 16);
game.create_building('Sarah', 'factory', 18, 5);

var camera = new Camera(game.players['Sarah']);
