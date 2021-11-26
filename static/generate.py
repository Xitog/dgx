#-------------------------------------------------------------------------------
# Imports
#-------------------------------------------------------------------------------

import logging
import os.path
import hamill

#-------------------------------------------------------------------------------

includes = ['menu.html']

def do(filepath, lang='fr'):
    input = os.path.join(os.getcwd(), 'input', *filepath.split('/'))
    output = os.path.join(os.getcwd(), '..', *filepath.split('/'))[:-4] + '.html'
    hamill.process_file(input, output, lang, includes)
    logging.info('Output file: ' + output)

print('Using Hamill:', hamill.__version__)

logging.getLogger().setLevel(logging.DEBUG)

# Full
#hamill.process('input', 'output', 'fr', includes)

# Mono file

targets = ['blog.hml',
           'index.hml',
           'plan.hml',
           'tests.hml',

           'histoire/bibliographie.hml',
           'histoire/france19eme.hml',
           'histoire/methode.hml',

           'informatique/ash_guide.hml',
           'informatique/bnf.hml',
           'informatique/hamill.hml',
           'informatique/json.hml',
           'informatique/lua.hml',
           'informatique/python.hml',
           'informatique/tools_langs.hml',
           'informatique/version_control.hml',

           'passetemps/history_fps_references_en.hml',
           'passetemps/history_fps_tables_en.hml',
           'passetemps/history_rts.hml',
           'passetemps/pres_favoris.hml',
           'passetemps/pres_jeux.hml',
           'passetemps/pres_jeuxvideo.hml',
           'passetemps/tech_dialogues.hml',
           'passetemps/tech_raycasting_en.hml',
           'passetemps/tech_raycasting_fr.hml',
           'passetemps/tech_transitions.hml'
           ]

#targets = ['passetemps/pres_jeuxvideo.hml']
targets = ['passetemps/pres_favoris.hml']

for t in targets:
    do(t)
