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

do('blog.hml')
do('index.hml')
do('plan.hml')
do('tests.hml')

do('histoire/bibliographie.hml')
do('histoire/france19eme.hml')
do('histoire/methode.hml')

do('informatique/ash_guide.hml')
do('informatique/bnf.hml')
do('informatique/hamill.hml')
do('informatique/json.hml')
do('informatique/lua.hml')
do('informatique/python.hml')
do('informatique/tools_langs.hml')
do('informatique/version_control.hml')

do('passetemps/history_fps_references_en.hml')
do('passetemps/history_fps_tables_en.hml')
do('passetemps/history_rts.hml')
do('passetemps/pres_favoris.hml')
do('passetemps/pres_jeux.hml')
do('passetemps/pres_jeuxvideo.hml')
do('passetemps/tech_dialogues.hml')
do('passetemps/tech_raycasting_en.hml')
do('passetemps/tech_raycasting_fr.hml')
do('passetemps/tech_transitions.hml')
