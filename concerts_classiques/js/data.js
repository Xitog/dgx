//-----------------------------------------------------------------------------
// Data needed by the application covering :
// ONCT 2015-2016 season
//-----------------------------------------------------------------------------

// [OPUS]       
var works = {
    'Attahir' : {
        'fullname' : 'Benjamin Attahir',
        'name'     : 'Benjamin Attahir',
        
        'NBruch' : 'Nach(t)spiel, pour violon et orchestre - final additionnel au Konzertstück, op. 84 de Max Bruch', // Création mondiale
        'Sawti' : 'Sawti\'l zaman, à la mémoire de Pierre Boulez',
    },
    'Adam' : {
        'fullname' : 'Adolphe Adam',
        'name'     : 'Adolphe Adam',
        
        'Giselle'  : 'Giselle',
    },
    'Bach'  : {
        'fullname' : 'Jean-Sébastien Bach',
        'name'     : 'Jean-Sébastien Bach',
        'birth'    : 1685,
        'death'    : 1750,
        
        '565'      : 'Toccata et fugue en ré mineur, BMV 565',
    },
    'Berg' : {
        'fullname' : 'Alban Berg',
        'name'     : 'Alban Berg',
        'birth'    : 1885,
        'death'    : 1935,
        
        'ange'     : 'Concerto pour violon et orchestre « À la mémoire d\'un ange »',
    },
    'Bizet' : {
        'fullname' : 'Georges Bizet',
        'name'     : 'Georges Bizet',
        'birth'    : 1838,
        'death'    : 1875,
        
        'Carmen1'  : 'Carmen, suite n°1 pour orchestre',
        'Carmen2'  : 'Carmen, suite n°2 pour orchestre',
        'S1'       : 'Symphonie n°1 en ut majeur',
        'ExtraitsCarmen' : 'Carmen (extraits)',
    },
    'Cherubini' : {
        'fullname' : 'Luigi Cherubini',
        'name'     : 'Luigi Cherubini',
        'birth'    : 1760,
        'death'    : 1842,
        
        'Sré'      : 'Symphonie en ré majeur',
    },
    'Dufourt' : {
        'fullname' : 'Hugues Dufourt',
        'name'     : 'Hugues Dufourt',
        'birth'     : 1943,
        'death'    : -1,
        
        'ur'       : 'Ur-Geräusch pour grand orchestre' // CRÉATION FRANÇAISE*
    },
    'Fauré' : {
        'fullname' : 'Gabriel Fauré',
        'name'     : 'Gabriel Fauré',
        'birth'    : 1845,
        'death'    : 1924,
        
        '80'       : 'Pelléas et Mélisande, op. 80',
    },
    'Holst' : {
        'fullname' : 'Gustav Holst',
        'name'     : 'Gustav Holst',
        
        '32' : 'The Planets op.32',
    },
    'Khatchatourian' : {
        'fullname' : 'Aram Ilitch Khatchatourian',
        'name'     : 'Aram Khatchatourian',
        'birth'    : 1903,
        'death'    : 1978,
        
        'cpianoré' : 'Concerto pour piano et orchestre en ré bémol majeur',
        'DanseSabre' : 'La Danse du Sabre',
    },
    'Rachmaninov' : {
        'fullname' : 'Sergueï Vassilievitch Rachmaninov',
        'name'     : 'Serge Rachmaninov',
        'birth'    : 1873,
        'death'    : 1943,
        
        '45'       : 'Danses symphoniques, op. 45',
    },
    'Ravel' : {
        'fullname' : 'Maurice Ravel',
        'name'     : 'Maurice Ravel',
        
        'M.61'     : 'Valses nobles et sentimentales',
        'MereOye'  : 'Ma Mère l’Oye, Suite pour orchestre', // du ballet
        'ConcertoPianoSolMajeur' : 'Concerto pour piano et orchestre en sol majeur',
        'La Valse' : 'La Valse, poème chorégraphique pour orchestre',
        'DaphnisChloéSuite2' : 'Daphnis et Chloé, Suite pour orchestre n°2',
        'Boléro'   : 'Boléro pour orchestre',
        'Shéhérazade' : 'Shéhérazade, Mélodies pour voix et orchestre',
        'Rapsodie' : 'Rapsodie pour orchestre',
        'RapsodieEspagnole' : 'Rapsodie espagnole',
        'ConcertoMainGauche' : 'Concerto pour la main gauche en ré majeur',
    },
    'Roussel' : {
        'fullname' : 'Albert Roussel',
        'name'     : 'Albert Roussel',
        'birth'    : 1869,
        'death'    : 1937,
        
        '43'       : 'Bacchus et Ariane, suite d\'orchestre n°2, op. 43',
    },
    'Adams' : {
        'fullname' : 'John Adams',
        'name'     : 'John Adams',
        
        'ConViolon1993' : 'Concerto pour violon et orchestre',
    },
    'Beethoven' : {
        'fullname' : 'Ludwig van Beethoven',
        'name' : 'Ludwig van Beethoven',
        
        '21' : 'Symphonie n°1 en ut majeur, op. 21',
        '36' : 'Symphonie n°2 en ré majeur, op. 36',
        '37' : 'Concerto pour piano et orchestre n°3 en ut mineur, op. 37',
        '55' : 'Symphonie n°3 « Héroïque » en mi bémol majeur op. 55',
        '56' : 'Triple concerto pour violon, violoncelle, piano et orchestre en ut majeur, op. 56',
        '58' : 'Concerto pour piano et orchestre n° 4 en sol majeur, op. 58',
        '60' : 'Symphonie n°4 en si bémol majeur, op. 60',
        '61' : 'Concerto pour violon et orchestre en ré majeur op. 61',
        '62' : 'Coriolan, ouverture en ut mineur, op. 62',
        '67' : 'Symphonie n°5 en ut mineur, op. 67',
        '68' : 'Symphonie n°6 « Pastorale » en fa majeur, op. 68',   
        '72B': 'Léonore III, Ouverture en do majeur, op. 72 B',
        '73' : 'Concerto pour piano n°5, op. 73 en mi bémol majeur',
        '84' : 'Egmont, ouverture en fa mineur, op. 84',
        '92' : 'Symphonie n°7 en la majeur, op. 92',
    },
    'Martinů' : {
        'fullname' : 'Bohuslav Martinů',
        'name'     : 'Bohuslav Martinů',
        
        'MemorialLidice' : 'Mémorial pour Lidice',
    },
    'Hartmann' : {
        'fullname' : 'Karl Amadeus Hartmann',
        'name'     : 'Karl Hartmann',
        
        'ConcertoFunebre' : 'Concerto funèbre pour violon et orchestre à cordes',
    },
    'Strauss' : {
        'fullname' : 'Richard Strauss',
        'name'     : 'Richard Strauss',
        
        '30' : 'Ainsi parlait Zarathoustra, poème symphonique, op. 30',
        '40' : 'Une vie de héros, poème symphonique, op. 40',
        '54' : 'Salomé, Danse des sept voiles, op. 54',
        '64' : 'Symphonie Alpestre, op. 64',
        'PrinceEtPrincesses' : 'Musiques de Strauss pour un conte musical inspiré librement du conte "La Princesse au petit pois" de Hans Christian Andersen',
    },
    'Bruch' : {
        'fullname' : 'Max Bruch',
        'name'     : 'Max Bruch',
        
        '26' : 'Concerto pour violon et orchestre n°1 en sol mineur, op. 26',
        '84' : 'Konzertstück pour violon solo et orchestre en fa dièse mineur op. 84',
    },
    'Mahler' : {
        'fullname' : 'Gustav Mahler',
        'name'     : 'Gustav Mahler',
        
        'S1' : 'Symphonie n°1 en ré majeur « Titan »',
        'S3' : 'Symphonie n°3 en ré mineur',
        'S4' : 'Symphonie n°4 en sol majeur',
        'S5' : 'Symphonie n° 5 en do dièse mineur',
        'S6' : 'Symphonie n°6 en la mineur « Tragique »',
    },
    'Maury' : {
        'fullname' : 'Jean-Michel Maury',
        'name'     : 'Jean-Michel Maury',
        
        'Fabrique' : 'La Fabrique de notes',
    },
    'Bartók' : {
        'fullname' : 'Béla Bartók',
        'name'     : 'Béla Bartók',
        
        'op. 13, Sz. 60' : 'Le Prince de bois, poème chorégraphique op. 13',
        'cordes_percu_celesta' : 'Musique pour cordes, percussions et célesta',
        'concerto_violon_1' : 'Concerto pour violon et orchestre n°1, sz 36, op. posthume',
        'concerto_alto_posth' : 'Concerto pour alto et orchestre opus posthume',
        '19' : 'Le mandarin merveilleux, suite d\'orchestre op. 19',
        'danses' : 'Danses populaires roumaines',
    },
    'Azagra' : {
        'fullname' : 'David Azagra',
        'name'     : 'David Azagra',
        
        'Prelude' : 'Prélude, création mondiale',
    },
    'Tchaïkovski' : {
        'fullname' : 'Piotr Ilitch Tchaïkovski',
        'name'     : 'Piotr Tchaïkovski',
        
        'romeojuliette' : 'Roméo et Juliette, ouverture fantaisie',
        '17' : 'Symphonie n°2 « Petite Russie », en ut mineur, opus 17',
        '33' : 'Variations sur un thème rococo pour violoncelle et orchestre op. 33',
        '35' : 'Concerto pour violon et orchestre en ré majeur, op. 35',
        '36' : 'Symphonie n°4 en fai mineur, opus 36',
        '55' : 'Suite n°3 en sol majeur, opus 55',
        '58' : 'Manfred, op. 58',
        '74' : 'Symphonie n°6 « Pathétique », en si mineur, opus 74',
        'extraitsBelle04022016' : 'La Belle au bois dormant : Acte 2, scène 1 n°18 : Entr\'acte',
        'extraitsLac04022016' : 'Le Lac des Cygnes : Acte 1 n°5: Pas de deux "le cygne noir" et Acte 3: Danse Russe',
        'BABD:Valse6' : 'La Belle au Bois Dormant : Valse n°6',
        'SW:Spe1' : 'Le Lac des Cygnes : Danse Espagnole, Danse Hongroise Czardas',
        'CN:Spe1' : 'Casse-Noisette : Danse des Mirlitons, Valse des Fleurs et Pas de deux',
        'extraitsLac' : 'Le Lac des Cygnes, extraits',
        'extraitsCasse' : 'Casse-noisette, extraits',
        'suiteLac' : 'Suite du Lac des Cygnes',
        'valse' : 'Valse de la sérénade',
        'Casse-noisette' : 'Casse-noisette',
    },
    'Lehman' : {
        'fullname' : 'Damien Lehman',
        'name'     : 'Damien Lehman',
        
        'alibaba' : 'Ali Baba et les Quarante Voleurs',
    },
    'Dalbavie' : {
        'fullname' : 'Marc-André Dalbavie',
        'name'     : 'Marc-André Dalbavie',
        
        'color' : 'Color',
    },
    'Say' : {
        'fullname' : 'Fazil Say',
        'name'     : 'Fazil Say',
        
        'water' : 'Water pour piano et orchestre',
    },
    'Chostakovitch' : {
        'fullname' : 'Dmitri Dmitrievitch Chostakovitch',
        'name'     : 'Dmitri Chostakovitch',
        'birth'    : 1906,
        'death'    : 1975,
        
        '10'       : 'Symphonie n°1 en fa mineur op. 10',
        'Jazz2'    : 'Suite de Jazz n°2 : Valse II (Sérénade / Valse) et Little polka n°4',
        'TahitiTrot' : 'Tahiti-Trot',
        '43'      : 'Symphonie n°4 en ut mineur, op. 43',
        '47'      : 'Symphonie n°5 en ré mineur, op. 47',
        '60'      : 'Symphonie n°7 en ut majeur « Leningrad », op. 60',
        '70'      : 'Symphonie n°9 en mi bémol majeur, op. 70',
        '77'      : 'Concerto pour violon et orchestre n°1 en la mineur, op. 77',
        '93'      : 'Symphonie n°10 en mi mineur, op. 93',
        '107'     : 'Concerto n°1 pour violoncelle et orchestre en mi bémol majeur, op. 107',
        '112'     : 'Symphonie n°12 en ré mineur « L\'année 1917 », op. 112',
    
    },
    'Bernstein' : {
        'fullname' : 'Leonard Bernstein',
        'name'     : 'Leonard Bernstein',
        'birth'    : 1918,
        'death'    : 1990,
        
        'candide' : 'Candide, Ouverture',
        'wss_danses' : 'Danses symphoniques de West Side Story',
        'OnTheTownDance' : 'Dance from «On the Town»',
    },
    'Gershwin' : {
        'fullname' : 'George Gershwin',
        'name'     : 'George Gershwin',
        'birth'    : 1898,
        'death'    : 1937,
        
        'AmericanInParis' : 'Un Américain à Paris, pour orchestre',
        '3songs'   : 'Three songs (Arr. D. Powers)',
        'TipToes'  : 'Tip Toes Overture',
        'Cuban'    : 'Cuban Overture', 
        'Rhapsody' : 'Rhapsody in blue pour piano et orchestre',
    },
    'Berlioz' : {
        'fullname' : 'Hector Berlioz',
        'name'     : 'Hector Berlioz',
        
        '17' : 'Roméo et Juliette, symphonie dramatique op. 17',
        '14' : 'Symphonie Fantastique op. 14',
    },
    'Messiaen' : {
        'fullname' : 'Olivier Messiaen',
        'name'     : 'Olivier Messiaen',
        
        'offrandes' : 'Les Offrandes oubliées, méditation symphonique',
    },
    'Dutilleux' : {
        'fullname' : 'Henri Dutilleux',
        'name'     : 'Henri Dutilleux',
        
        'toutunmondelointain' : 'Tout un Monde lointain, Concerto pour violoncelle et orchestre',
    },
    'Debussy' : {
        'fullname' : 'Claude Debussy',
        'name'     : 'Claude Debussy',
        
        'faune' : 'Prélude à l\'après-midi d\'un faune',
        'lamer' : 'La Mer, trois esquisses symphoniques',
        'Rhapsodie n°1 pour clarinette' : 'Rhapsodie n°1 pour clarinette',
    },
    'Stravinsky' : {
        'fullname' : 'Igor Fyodorovich Stravinsky',
        'name'     : 'Igor Stravinsky',
        
        'oiseausuite2' : 'L’Oiseau de feu, Suite pour orchestre n° 2',
        'oiseausuiteX' : 'Suite pour orchestre de l\'Oiseau de feu', // Ils ne précisent pas sur quelle suite Béjart a fait son ballet
        'OF:Spe1' : 'L\'Oiseau de feu, Suite pour Orchestre (version 1919) : Danse infernale du Roi Kastcheï, Berceuse et Final ',
        'oiseau_de_feu_extraits_symph' : 'L’Oiseau de feu, extraits symphoniques',
        // Unifié
        'suite_oiseau_1910' : 'L’Oiseau de feu, suite pour orchestre n° 1 (1910)',
        'suite_oiseau_1919' : 'L’Oiseau de feu, suite pour orchestre n° 2 (1919)',
        'suite_oiseau_1945' : 'L’Oiseau de feu, suite de ballet de (1945)',
        'Apollon' : 'Apollon Musagete',
    },
    'Schoenberg' : {
        'fullname' : 'Arnold Schoenberg',
        'name'     : 'Arnold Schoenberg',
        
        '16' : 'Cinq pièces pour orchestre, op. 16',
    },
    'Mantovani' : {
        'fullname' : 'Bruno Mantovani',
        'name'     : 'Bruno Mantovani',
        
        'jeuxdeau' : 'Jeux d’eau pour violon et orchestre',
        'Nouvelle1' : 'Œuvre nouvelle, création mondiale',
    },
    'Berio' : {
        'fullname' : 'Luciano Berio',
        'name'     : 'Luciano Berio',
        
        'chemin4' : 'Chemin IV pour hautbois et cordes',
    },
    'Schubert' : {
        'fullname' : 'Franz Schubert',
        'name'     : 'Franz Schubert',
            
        '417' : 'Symphonie n°4 en ut mineur « Tragique », D. 417',
        '485' : 'Symphonie n°5 en si bémol majeur, D. 485',
        '644' : 'Ouverture de Rosamunde D. 644',
        '759' : 'Symphonie n°8 « inachevée » en si mineur D. 759',
        '797' : 'Rosamunde, musique de scène D. 797',
        '935' : 'Impromptus n°3 et 4 D. 935',
        '944' : 'Symphonie n°9 en ut majeur « La Grande », D.944',
        '950' : 'Ouverture dans le style italien D. 950',
    },
    'Brahms' : {
        'fullname' : 'Johannes Brahms',
        'name'     : 'Johannes Brahms',
        
        '45' : 'Un requiem allemand, op. 45, pour soprano, baryton, chœur et orchestre',
        '68' : 'Symphonie n°1 en ut mineur, op. 68',
        '73' : 'Symphonie n°2 en ré majeur, op. 73',
        '77' : 'Concerto pour violon et orchestre en ré majeur, op. 77',
        '83' : 'Concerto pour piano et orchestre n°2 en si bémol majeur, op. 83',
        '98' : 'Symphonie n°4 en mi mineur, op. 98',
    },
    'Campra' : {
        'fullname' : 'André Campra',
        'name'     : 'André Campra',
        
        'birth' : '1660',
        'death' : '1744',
        
        'Les Fêtes Vénitiennes' : 'Les Fêtes Vénitiennes', // 2h40 baroque français
    },
    'Delibes' : {
        'fullname' : 'Léo Delibes',
        'name'     : 'Léo Delibes',
        
        'Coppélia' : 'Coppélia', // 1h50
    },
    'Prokofiev' : {
        'fullname' : 'Sergueï Prokofiev',
        'name'     : 'Sergueï Prokofiev',
        
        'Pièces pour piano pour Salle des pas perdus' : 'Pièces pour piano pour Salle des pas perdus',
        'Alexandre Nevski' : 'Alexandre Nevski',
        '16' : 'Concerto pour piano et orchestre n°2 en sol mineur, op. 16',
        '19' : 'Concerto pour violon et orchestre n°2 en ré majeur, op. 19',
        '26' : 'Concerto pour piano n°3 en ut majeur, op. 26',
        '91' : 'Ouverture de Guerre et Paix, op. 91',
        '100' : 'Symphonie n°5 en si bémol majeur, op. 100',
    },
    'Bryars' : {
        'fullname' : 'Gavin Bryars',
        'name'     : 'Gavin Bryars',
        
        'Les Fiançailles' : 'Les Fiançailles',
    },
    'Dallapiccola' : {
        'fullname' : 'Luigi Dallapiccola',
        'name'     : 'Luigi Dallapiccola',
        
        'birth' : 1904,
        'death' : 1975,
        
        'Canti di Prigionia' : 'Canti di Prigionia',
    },
    'Mozart' : {
        'fullname' : 'Wolfgang Amadeus Mozart',
        'name'     : 'Wolfgang Amadeus Mozart',
        'birth'    : 1756,
        'death'    : 1791,
        
        'Les Noces de Figaro' : 'Les Noces de Figaro', // 1789 3h20
        'K16'      : 'Symphonie n°1 en mi bémol majeur, K. 16',
        'K216'     : 'Concerto pour violon et orchestre n°3 en sol majeur K. 216',
        'K271'     : 'Concerto n°9 pour piano et orchestre en mi bémol majeur « Jeune homme », K. 271',
        'K297'     : 'Symphonie n°31 en ré majeur « Paris », K. 297',
        'KV297b'   : 'Symphonie concertante pour vents en mi bémol majeur, KV. 297b',
        'K315'     : 'Andante pour flûte et orchestre en ut majeur, K. 315',
        'K488'     : 'Concerto pour piano n°23 en la majeur, K.488',
        'K453'     : 'Concerto pour piano et orchestre n°17 en sol majeur, K. 453',
        '456'      : 'Concerto pour piano et orchestre n°18 en si bémol majeur, K. 456',
        '527ouv'   : 'Don Giovanni, K. 527, ouverture',
        '551'      : 'Symphonie n°41 en ut majeur, « Jupiter », KV. 551',
        '622'      : 'Concerto pour clarinette et orchestre en la majeur, K. 622',
        'Nozze di Figaro, Ouverture et La deuxième comtesse « Dove sono »' : 'Nozze di Figaro, Ouverture et La deuxième comtesse « Dove sono »',
        'Don Giovanni, Ouverture et Air de Zerlina - Vedrai carino' : 'Don Giovanni, Ouverture et Air de Zerlina - Vedrai carino',
        'Così fan tutte, Ouverture et Air de Despina - Una donna a quindici anni »' : 'Così fan tutte, Ouverture et Air de Despina - Una donna a quindici anni »',
        'trio1'    : 'Trio en ut majeur',
        'quatuor1' : 'Quatuor avec piano en sol mineur',
        'quatuor2' : 'Quatuor avec flute en ré majeur',
        'quatuor3' : 'Quatuor avec hautbois',
        'serdiv'   : 'Sérénades et divertimentos',
    },
    'Rossini' : {
        'fullname' : 'Gioacchino Rossini',
        'name'     : 'Gioacchino Rossini',
        'birth' : 1792,
        'death' : 1868,
        
        'L\'Italienne à Alger' : 'L\'Italienne à Alger', // 1813 2h45
        'barbier-ouv'          : 'Le Barbier de Séville, ouverture',
    },
    'Minkus' : {
        'fullname' : 'Ludwig Minkus',
        'name'     : 'Ludwig Minkus',
        
        'Paquita Grand Pas' : 'Paquita Grand Pas', // Création de la version d’Oleg Vinogradov par le Ballet du Kirov le 29 juin 1978 au Théâtre Kirov de Léningrad 
    },
    'Tanguy' : {
        'fullname' : 'Eric Tanguy',
        'name'     : 'Eric Tanguy',
        
        'Intrada' : 'Intrada',
    },
    'Saint-Saëns' : {
        'fullname' : 'Camille Saint-Saëns',
        'name'     : 'Camille Saint-Saëns',
        'birth'    : 1835,
        'death'    : 1921,
        
        '22' : 'Concerto pour piano et orchestre n°2 en sol mineur, op. 22',
        '33' : 'Concerto pour violoncelle et orchestre n°1 en la mineur, op. 33',
        '78' : 'Symphonie n°3 en ut mineur avec orgue, op. 78',
        'Havanaise' : 'Havanaise',
    },
    'Walton' : {
        'fullname' : 'William Walton',
        'name'     : 'William Walton',
        
        'Henry V' : 'Henry V',
    },
    'Mendelssohn' : {
        'fullname' : 'Felix Mendelssohn',
        'name'     : 'Felix Mendelssohn',
        
        'songe'    : 'Le Songe d\'une nuit d\'été',
        '25'       : 'Concerto pour piano et orchestre n°1 en sol mineur, op. 25',
        '26'       : 'Ouverture en si mineur, « Les Hébrides », op. 26',
        '56'       : 'Symphonie n°3 en la mineur, « Écossaise », op. 56',
        '64'       : 'Concerto pour violon et orchestre en mi mineur, op. 64',
    },
    'Zimmermann' : {
        'fullname' : 'Bernhard Alois Zimmermann',
        'name'     : 'Bernd Alois Zimmermann',
        
        'nobody' : '« Nobody Knows the Trouble I See », pour trompette et orchestre',
    },
    'Agobet' : {
        'fullname' : 'Jean-Louis Agobet',
        'name'     : 'Jean-Louis Agobet',
        
        'Génération, pour 3 clarinettes' : 'Génération, pour 3 clarinettes',
    },
    'Takemitsu' : {
        'fullname' : 'Toru Takemitsu',
        'name'     : 'Toru Takemitsu',
        
        'Quotation of a dream' : 'Quotation of a dream',
    },
    'Liadov' : {
        'fullname' : 'Anatoli Konstantinovitch Liadov',
        'name'     : 'Anatoli Liadov',
        
        '62' : 'Le Lac enchanté op. 62',
    },
    'Glazounov' : {
        'fullname' : 'Alexandre Konstantinovitch Glazounov',
        'name'     : 'Alexandre Glazounov',
        
        'extraitsRaymonda04022016' : 'Raymonda: Acte 1 scène 2 : Grand Adagio et Acte 1 scène 2: Variation 3',
    },
    'Wagner' : {
        'fullname' : 'Richard Wagner',
        'name'     : 'Richard Wagner',
        
        'Tristan und Isolde, Prélude et « Liebestod »' : 'Tristan und Isolde, Prélude et « Liebestod »',
        'Parsifal, Ouverture et « Enchantement du Vendredi Saint »' : 'Parsifal, Ouverture et « Enchantement du Vendredi Saint »',
        'Götterdämmerung, Extraits' : 'Götterdämmerung, Extraits',
    },
    'Devienne' : {
        'fullname' : 'François Devienne',
        'name'     : 'François Devienne',
        
        'cfo7' : 'Concerto pour flûte et orchestre n°7 en mi mineur',
    },
    'Dvorak' : {
        'fullname' : 'Antonín Dvořák',
        'name'     : 'Antonín Dvořák',
        
        'dansesExtraits1' : 'Danses slaves n°2, op. 72 et n°8, op. 46',
        '53' : 'Concerto pour violon et orchestre en la mineur, op. 53',
        '88' : 'Symphonie n°8 en sol majeur, op. 88',
        '95' : 'Symphonie n°9 en mi mineur « du nouveau monde », op. 95',
        'valse' : 'Valse de la sérénade',
            
    },
    'Grieg' : {
        'fullname' : 'Edvard Grieg',
        'name'     : 'Edvard Grieg',
        
        '16' : 'Concerto pour piano en la mineur, op. 16',
    },
    'Escaich' : {
        'fullname' : 'Thierry Escaich',
        'name'     : 'Thierry Escaich',
        
        'ClaudeSuite' : 'Suite symphonique extraite de l’Opéra "Claude"',
    },
    'Barber' : {
        'fullname' : 'Samuel Barber',
        'name'     : 'Samuel Barber',
        
        '36' : 'Toccata festiva, op. 36',
    },
    'Bruckner' : {
        'fullname' : 'Anton Bruckner',
        'name'     : 'Anton Bruckner',
        
         '95' : 'Symphonie n°4 en mi bémol majeur « Romantique », A. 95',
        '109' : 'Symphonie n°7 en mi majeur, A. 109',
        'WAB 106' : 'Symphonie n°6 en la majeur, WAB 106',
    },
    'Schumann' : {
        'fullname' : 'Robert Schumann',
        'name'     : 'Robert Schumann',
        
        '54' : 'Concerto pour piano et orchestre en la mineur, op. 54',
        '61' : 'Symphonie n°2 en ut majeur, op. 61',
        '115' : 'Manfred, Ouverture, op. 115', 
        'FaustOuvScenes' : 'Scènes de Faust, Ouverture',
    },
    'Bellini' : {
        'fullname' : 'Vincenzo Bellini',
        'name'     : 'Vincenzo Bellini',
        
        'ConcertoHauboisMiBémolMajeur' : 'Concerto pour Hautbois et orchestre en mi bémol Majeur',
    },
    'Suhubiette'  : {
        'fullname' : 'Hervé Suhubiette',
        'name'     : 'Hervé Suhubiette',
        
        'Gâteaux et chapeaux' : 'Gâteaux et chapeaux',
    },
    'StraussJ2' : {
        'fullname' : 'Johann II Strauss',
        'name'     : 'Johann II Strauss',
        
        'Bat' : 'La Chauve-Souris (die Fledermaus), ouverture',
    },
    'Offenbach' : {
        'fullname' : 'Jacques Offenbach',
        'name'     : 'Jacques Offenbach',
        
        'CdH:Barcarolle' : 'Les Contes d\'Hoffmann, Barcarolle',
    },
    'Verdi' : {
        'fullname' : 'Giuseppe Verdi',
        'name'     : 'Giuseppe Verdi',
        
        'Force du Destin : Ouverture' : 'Force du Destin : Ouverture',
        'Don Carlo : Acte II, Choeur et aria (Il Frate) « Carlo, il sommo Imperatore… »' : 'Don Carlo : Acte II, Choeur et aria (Il Frate) « Carlo, il sommo Imperatore… »',
        'Simon Boccanegra : Acte III, Prologue, récitatif avec choeur « A te l’estremo addio… »' : 'Simon Boccanegra : Acte III, Prologue, récitatif avec choeur « A te l’estremo addio… »',
        'Nabucco : Gli arredi festivi (Choeur d’introduction du 1er acte)' : 'Nabucco : Gli arredi festivi (Choeur d’introduction du 1er acte)',
        'Traviata : Prélude' : 'Traviata : Prélude',
        'Nabucco : Acte II, Air de Zaccaria. Preghiera « Vieni, o Levita ! », « Tu sul labro… »' : 'Nabucco : Acte II, Air de Zaccaria. Preghiera « Vieni, o Levita ! », « Tu sul labro… »',
        'Nabucco : Va’ pensiero' : 'Nabucco : Va’ pensiero',
        'Macbeth (version Paris 1865) : Acte II, n°10, recitatif “Studia il passo” + Air de Banco “Come dal ciel precipita”' : 'Macbeth (version Paris 1865) : Acte II, n°10, recitatif “Studia il passo” + Air de Banco “Come dal ciel precipita”',
        'Les Vêpres siciliennes : Ouverture' : 'Les Vêpres siciliennes : Ouverture',
        'Les Vêpres siciliennes : Acte II, scène 1 (n°7) : Air de Giovanni da Procida « O patria o cara », « O tu Palermo ».' : 'Les Vêpres siciliennes : Acte II, scène 1 (n°7) : Air de Giovanni da Procida « O patria o cara », « O tu Palermo ».',
        'Otello : Fuoco di gioia (1er acte)' : 'Otello : Fuoco di gioia (1er acte)',
        'Ernani : Acte I, scène 9 (final), récitatif : « Che mai veggio » + air de Silva « Infelice !... e tuo credevi »' : 'Ernani : Acte I, scène 9 (final), récitatif : « Che mai veggio » + air de Silva « Infelice !... e tuo credevi »',
        'Nabucco : Ouverture' : 'Nabucco : Ouverture',
        'Don Carlo : Acte IV, Air de Filippo « Ella Giammai m’ amo »' : 'Don Carlo : Acte IV, Air de Filippo « Ella Giammai m’ amo »',
        'Requiem' : 'Messa da requiem',
    },
    'Widor' : {
        'fullname' : 'Charles-Marie Widor',
        'name'     : 'Charles-Marie Widor',
        'birth'    : 1844,
        'death'    : 1937,
        
        '42B'      : 'Symphonie pour orgue et orchestre, op. 42 bis',
    },
    'Duruflé - De Boer' : {
        'fullname' : 'Duruflé - De Boer',
        'name'     : 'Duruflé - De Boer',
        
        '5' : 'Transcription de la suite pour orgue, op. 5',
    },
    'Sibelius' : {
        'fullname' : 'Jean Sibelius',
        'name'     : 'Jean Sibelius',
        
        '22' : 'Suite de Lemminkäinen, op. 22',
        '43' : 'Symphonie n°2 en ré majeur, op. 43',
        '47' : 'Concerto pour violon et orchestre en ré majeur, op. 47',
        'Finlandia' : 'Finlandia, poème symphonique',
    },
    'WeinerL' : {
        'fullname' : 'Leó Weiner',
        'name'     : 'Leó Weiner',
        'birth'    : 1885,
        'death'    : 1960,
        
        '18' : 'Hungarian Folkdance, op. 18',
    },
    'Schnittke' : {
        'fullname' : 'Alfred Schnittke',
        'name'     : 'Alfred Schnittke',
        
        'SuiteStyleAncien' : 'Suite dans le style ancien',
    },
    'Didier' : {
        'fullname' : 'Romain Didier',
        'name'     : 'Didier',
        
        'Pantin' : 'Pantin Pantine',
    },
    'Mills' : {
        'fullname' : 'Jeff Mills',
        'name'     : 'Jeff Mills',
        
        'LightOutsideWorld' : 'Light from the outside world',
        'LostInSpace' : 'Lost in space',
    },
    'Hérissier' : {
        'fullname' : 'Julien Le Hérissier',
        'name'     : 'Julien Le Hérissier',
        
        'Indigo' : 'L\'île Indigo, conte musicale',
    },
    'Nielsen' : {
        'fullname' : 'Carl Nielsen',
        'name'     : 'Carl Nielsen',
        
        '34' : 'Aladin, suite pour orchestre, op. 34',
    },
    'Chausson' : {
        'fullname' : 'Ernest Chausson',
        'name'     : 'Ernest Chausson',
    
        '20' : 'Symphonie en si bémol majeur, op. 20',
        '25' : 'Poème pour violon et orchestre, op. 25',
    },
    'Poulenc' : {
        'fullname' : 'Francis Poulenc',
        'name'     : 'Francis Poulenc',
        
        'animaux' : 'Les animaux modèles, suite pour orchestre',
        'babar' : 'L\'histoire de Babar',
    },
    'Massenet' : {
        'fullname' : 'Jules Massenet',
        'name'     : 'Jules Massenet',
        'birth' : 1842,
        'death' : 1912,
        
        'donquichotte' : 'Don Quichotte, opéra en version de concert',
    },
    'Haydn' : {
        'fullname' : 'Joseph Haydn',
        'name'     : 'Joseph Haydn',
        'birth'    : 1732,
        'death'    : 1809,
        
        'VIIE.1'   : 'Concerto pour trompette et orchestre en mi bémol majeur, Hob. VIIE.1',
    },
    'Marquez' : {
        'fullname' : 'Arturo Márquez',
        'name'     : 'Arturo Márquez',
        'birth'    : 1950,
        'death'    : -1,
        
        'Danzon2'  : 'Danzón no. 2, pour orchestre',
    },
    'Williams' : {
        'fullname' : 'John Williams',
        'name'     : 'John Williams',
        
        'extraits' : 'Œuvres pour le cinéma',
    },
    'Nagel' : {
        'fullname' : 'Florent Nagel',
        'name'     : 'Florent Nagel',
        
        'Alice'    : 'Alice au pays des merveilles, conte musical',
    },
    'Britten' : {
        'fullname' : 'Benjamin Britten',
        'name'     : 'Benjamin Britten',
        'birth'    : 1913,
        'death'    : 1976,
        
        'simple'   : 'Simple Symphony',
    },
    'Lalo' : {
        'fullname' : 'Édouard Victoire Antoine Lalo',
        'name'     : 'Édouard Lalo',
        'birth'    : 1823,
        'death'    : 1892,
        
        'SymphonieEspagnole' : 'Symphonie espagnole',
        'ConcertoVioloncelleRé' : 'Concerto pour violoncelle et orchestre en ré mineur',
    },
    'Chabrier' : {
        'fullname' : 'Emmanuel Chabrier',
        'name'     : 'Emmanuel Chabrier',
        'birth'    : 1841,
        'death'    : 1894,
        
        'Espana' : 'España',
    },
    'Falla' : {
        'fullname' : 'Manuel Maria de los Dolores Falla y Matheu',
        'name'     : 'Manuel de Falla',
        'birth'    : 1876,
        'death'    : 1946,
        
        'Tricorne' : 'Le Tricorne',
    },
    'Zygel' : {
        'fullname' : 'Jean-François Zygel',
        'name'     : 'Jean-François Zygel',
        
        'Malaga' : 'Malaga',
    },
    'Boulez' : {
        'fullname' : 'Pierre Boulez',
        'name'     : 'Pierre Boulez',
        
        'Notations1-4' : 'Notations n°1 à 4, pour orchestre',
    },
    'Varèse' : {
        'fullname' : 'Edgard Victor Achille Charles Varèse',
        'name'     : 'Edgard Varèse',
        
        'Amériques' : 'Amériques, pour orchestre',
    },
    'Ginastera' : {
        'fullname' : 'Alberto Evaristo Ginastera',
        'name'     : 'Alberto Ginastera',
        'birth'    : 1916,
        'death'    : 1983,
        
        'VarConcertantes' : 'Variations concertantes',
    },
    'Puccini' : {
        'fullname' : 'Giacomo Antonio Domenico Michele Secondo Maria Puccini',
        'name'     : 'Giacomo Puccini',
        'birth'    : 1858,
        'death'    : 1924,
        
        'PreludoSinfonico' : 'Preludo Sinfonico',
    },
    'Respighi' : {
        'fullname' : 'Ottorino Respighi',
        'name'     : 'Ottorino Respighi',
        'birth'    : 1879,
        'death'    : 1936,
        
        'FontaneDiRoma' : 'Fontane di Roma, poème symphonique',
    },
    'Chen' : {
        'fullname' : 'Qigang Chen',
        'name'     : 'Qigang Chen',
        'birth'    : 1951,
        
        'JoieDeSouffrance' : 'La joie de la souffrance, concerto pour violon, création française',
    },
    'Spécial' : {
        'fullname' : 'Spécial',
        'name'     : 'Spécial',
        
        'Programme spécial' : 'Programme spécial',
        'Clarinettes250216' : 'Ensemble de Clarinettes (pièce de 4 minutes, jouée par 150 élèves clarinettistes de Gironde)',
        'tourdumonde' : 'Petits et grands : Le tour du monde en 45\', Musiques de Tchaikovski, Bartok, De Falla, Copland...',
        //'nouvel_an_tlse_2016' : 'Concerts du nouvel an, Un nouvel an russe en compagnie de Tugan Sokhiev',
        'BabaYaga' : 'Baba Yaga, avec la musique de M. Moussorgski et I. Stravinski',
        'Galanta'  : 'Bienvenue à Galanta. Les Clés de l\'écoute. Musiques inspirées de Zoltán Kodály',
        'NouvelAn2017' : 'Le Nouvel An de Tugan Sokhiev',
    },
};

var dates = [
    //
    // [DATES] Concerts ONCT et Opéra TC par dates
    //
    
    //-------------------------------------------------------------------------
    // Début saison 2018-2019
    // Fin saison 2017-2018
    //-------------------------------------------------------------------------
    
    //-------------------------------------------------------------------------
    // Juin 2018
    //-------------------------------------------------------------------------
    
    [
        '22/06/2018', '20:00', 'ONCT', 'Enrique Mazzola (dir.)', 'Edgar Moreau (Violoncelle)', '', [
            ['Puccini', 'PreludoSinfonico'],
            ['Lalo', 'ConcertoVioloncelleRé'],
            ['Respighi', 'FontaneDiRoma'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '16/06/2018', '20:00', 'ONCT', 'Long Yu (dir.)', 'Chad Hoopes (violon), Yuanming Song (soprano)', '', [
            ['Chen', 'JoieDeSouffrance'],
            ['Mahler', 'S4'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '09/06/2018', '20:00', 'ONCT', 'Tugan Sokhiev (dir.)', 'Erika Grimaldi (soprano), Anna Kiknadze (mezzo-soprano), Saimir Pirgu (ténor), Vitalij Kowaljow (basse), Orfeón Donostiarra (chœur), José Antonio Sainz Alfaro (chef de chœur)', '', [
            ['Verdi', 'Requiem'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '08/06/2018', '20:00', 'ONCT', 'Tugan Sokhiev (dir.)', 'Erika Grimaldi (soprano), Anna Kiknadze (mezzo-soprano), Saimir Pirgu (ténor), Vitalij Kowaljow (basse), Orfeón Donostiarra (chœur), José Antonio Sainz Alfaro (chef de chœur)', '', [
            ['Verdi', 'Requiem'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '02/06/2018', '20:00', 'ONCT', 'Tugan Sokhiev (dir.)', 'Nicholas Angelich (piano)', '', [
            ['Mantovani', 'Nouvelle1'],
            ['Prokofiev', '26'],
            ['Debussy', 'lamer'],
            ['Ravel', 'DaphnisChloéSuite2'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    //-------------------------------------------------------------------------
    // Mai 2018
    //-------------------------------------------------------------------------
    
    [
        '26/05/2018', '20:00', 'ONCT', 'Marcelo Lehninger (dir.)', 'Fazil Say (piano)', '', [
            ['Ginastera', 'VarConcertantes'],
            ['Saint-Saëns', '22'],
            ['Beethoven', '92'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '18/05/2018', '20:00', 'ONCT', 'Josep Pons (dir.)', '', '', [
            ['Schumann', 'FaustOuvScenes'],
            ['Schubert', '759'],
            ['Schumann', '61'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '12/05/2018', '20:00', 'ONCT', 'Clemens Schuldt (dir.)', 'Baiba Skride (violon)', '', [
            ['Schumann', '115'],
            ['Prokofiev', '19'],
            ['Beethoven', '55'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '05/05/2018', '20:00', 'ONCT', 'Bruno Mantovani (dir.)', 'Roger Muraro (piano)', '', [
            ['Boulez', 'Notations1-4'],
            ['Ravel', 'ConcertoMainGauche'],
            ['Varèse', 'Amériques'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    
    //-------------------------------------------------------------------------
    // Avril 2018
    //-------------------------------------------------------------------------
    
    [
        '28/04/2018', '18:00', 'ONCT', 'Jean-François Zygel (piano et improvisations)', 'David Niemann (dir.)', '', [
            ['Ravel', 'RapsodieEspagnole'],
            ['Bizet', 'ExtraitsCarmen'],
            ['Chabrier', 'Espana'],
            ['Lalo', 'SymphonieEspagnole'],
            ['Saint-Saëns', 'Havanaise'],
            ['Zygel', 'Malaga'],
            ['Falla', 'Tricorne'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '20/04/2018', '20:00', 'ONCT', 'Stanislav Kochanovsky (dir.)', 'Sergey Khachatryan (violon)', '', [
            ['Chostakovitch', '77'],
            ['Tchaïkovski', '58'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '15/04/2018', '10:45', 'ONCT', 'Christophe Mangou (dir.)', 'Maëlle Mietton (récitante et livret)', '', [
            ['Strauss', 'PrinceEtPrincesses'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '07/04/2018', '20:00', 'ONCT', 'Christophe Mangou (dir.)', 'Jeff Mills (dj)', '', [
            ['Mills', 'LostInSpace'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '06/04/2018', '20:00', 'ONCT', 'Christophe Mangou (dir.)', 'Jeff Mills (dj)', '', [
            ['Mills', 'LostInSpace'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '05/04/2018', '20:00', 'ONCT', 'Christophe Mangou (dir.)', 'Jeff Mills (dj)', '', [
            ['Mills', 'LostInSpace'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    
    //-------------------------------------------------------------------------
    // Mars 2018
    //-------------------------------------------------------------------------
    
    [
        '31/03/2018', '18:00', 'ONCT', 'Jean-François Zygel (piano et improvisations)', '', '', [
            ['Mozart', 'serdiv'],
            ['Dvorak', 'valse'],
            ['Tchaïkovski', 'valse'],
            ['Stravinsky', 'Apollon'],
            ['Bartók', 'danses'],
            ['Britten', 'simple'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '25/03/2018', '10:45', 'ONCT', 'Christophe Mangou (dir.)', 'Yves Penay (récitant)', '', [
            ['Nagel', 'Alice'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '10/03/2018', '18:00', 'ONCT', 'Tugan Sokhiev (dir.)', '', '', [
            ['Tchaïkovski', 'suiteLac'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '05/03/2018', '20:00', 'ONCT', 'Tugan Sokhiev (dir.)', 'Vadim Repin (violon)', '', [
            ['Tchaïkovski', '35'],
            ['Chostakovitch', '112'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    
    //-------------------------------------------------------------------------
    // Février 2018
    //-------------------------------------------------------------------------
    
    [
        '24/02/2018', '18:00', 'ONCT', 'Andris Poga (dir.)', '', '', [
            ['Dvorak', 'dansesExtraits1'],
            ['Dvorak', '88'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '23/02/2018', '20:00', 'ONCT', 'Andris Poga (dir.)', 'Andreï Korobeinikov (piano)', '', [
            ['Attahir', 'Sawti'],
            ['Prokofiev', '16'],
            ['Dvorak', '88'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '15/02/2018', '20:00', 'ONCT', 'Thomas Søndergård (dir.)', 'Josef Špaček (violon)', '', [
            ['Beethoven', '84'],
            ['Dvorak', '53'],
            ['Beethoven', '60'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '10/02/2018', '18:00', 'ONCT', 'Jean-François Zygel (piano et improvisations)', '', '', [
            ['Mozart', 'trio1'],
            ['Mozart', 'quatuor1'],
            ['Mozart', 'quatuor2'],
            ['Mozart', 'quatuor3'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '03/02/2018', '18:00', 'ONCT', 'Klaus Mäkelä (dir.)', '', '', [
            ['Sibelius', 'Finlandia'],
            ['Sibelius', '43'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    
    //-------------------------------------------------------------------------
    // Janvier 2018
    //-------------------------------------------------------------------------
    
    [
        '12/01/2018', '20:00', 'ONCT', 'Tugan Sokhiev (dir.)', 'Daniel Lozakovich (violon)', '', [
            ['Bruch', '26'],
            ['Chostakovitch', '43'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '06/01/2018', '20:00', 'ONCT', 'Tugan Sokhiev (dir.)', 'Elisabeth Leonskaja (piano)', '', [
            ['Beethoven', '58'],
            ['Schubert', '944'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '01/01/2018', '18:00', 'ONCT', 'Tugan Sokhiev (dir.)', '', '', [
            ['Spécial', 'NouvelAn2017'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    
    //-------------------------------------------------------------------------
    // Décembre 2017
    //-------------------------------------------------------------------------
    
    [
        '31/12/2017', '20:00', 'ONCT', 'Tugan Sokhiev (dir.)', '', '', [
            ['Spécial', 'NouvelAn2017'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '31/12/2017', '15:00', 'ONCT', 'Koen Kessels (dir.), Kader Belarbi (chorégraphie et mise en scène)', '', '', [
            ['Tchaïkovski', 'Casse-noisette'],
        ],
        'Toulouse', 'Théâtre du Capitole', 'Ballet',
    ],
    [
        '30/12/2017', '20:00', 'ONCT', 'Koen Kessels (dir.), Kader Belarbi (chorégraphie et mise en scène)', '', '', [
            ['Tchaïkovski', 'Casse-noisette'],
        ],
        'Toulouse', 'Théâtre du Capitole', 'Ballet',
    ],
    [
        '30/12/2017', '20:00', 'ONCT', 'Tugan Sokhiev (dir.)', '', '', [
            ['Spécial', 'NouvelAn2017'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '29/12/2017', '20:00', 'ONCT', 'Koen Kessels (dir.), Kader Belarbi (chorégraphie et mise en scène)', '', '', [
            ['Tchaïkovski', 'Casse-noisette'],
        ],
        'Toulouse', 'Théâtre du Capitole', 'Ballet',
    ],
    [
        '27/12/2017', '20:00', 'ONCT', 'Koen Kessels (dir.), Kader Belarbi (chorégraphie et mise en scène)', '', '', [
            ['Tchaïkovski', 'Casse-noisette'],
        ],
        'Toulouse', 'Théâtre du Capitole', 'Ballet',
    ],
    [
        '26/12/2017', '20:00', 'ONCT', 'Koen Kessels (dir.), Kader Belarbi (chorégraphie et mise en scène)', '', '', [
            ['Tchaïkovski', 'Casse-noisette'],
        ],
        'Toulouse', 'Théâtre du Capitole', 'Ballet',
    ],
    [
        '24/12/2017', '15:00', 'ONCT', 'Koen Kessels (dir.), Kader Belarbi (chorégraphie et mise en scène)', '', '', [
            ['Tchaïkovski', 'Casse-noisette'],
        ],
        'Toulouse', 'Théâtre du Capitole', 'Ballet',
    ],
    [
        '23/12/2017', '20:00', 'ONCT', 'Koen Kessels (dir.), Kader Belarbi (chorégraphie et mise en scène)', '', '', [
            ['Tchaïkovski', 'Casse-noisette'],
        ],
        'Toulouse', 'Théâtre du Capitole', 'Ballet',
    ],
    [
        '22/12/2017', '20:00', 'ONCT', 'Koen Kessels (dir.), Kader Belarbi (chorégraphie et mise en scène)', '', '', [
            ['Tchaïkovski', 'Casse-noisette'],
        ],
        'Toulouse', 'Théâtre du Capitole', 'Ballet',
    ],
    [
        '21/12/2017', '20:00', 'ONCT', 'Koen Kessels (dir.), Kader Belarbi (chorégraphie et mise en scène)', '', '', [
            ['Tchaïkovski', 'Casse-noisette'],
        ],
        'Toulouse', 'Théâtre du Capitole', 'Ballet',
    ],
    [
        '21/12/2017', '20:00', 'ONCT', 'Ben Gernon (dir.)', 'François-René Duchâble (piano)', '', [
            ['Rossini', 'barbier-ouv'],
            ['Grieg', '16'],
            ['Beethoven', '36'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '15/12/2017', '20:00', 'ONCT', 'Giacomo Sagripanti (dir.)', 'Erika Grimaldi (soprano), Chiara Amaru (mezzo-soprano), Edgardo Rocha (ténor), Krzysztof Baczyk (basse)', 'Chœur du Capitole (chœur), Alfonso Caiani (chef de chœur)', [
            ['Rossini', 'barbier-ouv'],
            ['Cherubini', 'Sré'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '09/12/2017', '20:00', 'ONCT', 'Tugan Sokhiev (dir.)', '', '', [
            ['Williams', 'extraits'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '08/12/2017', '20:00', 'ONCT', 'Tugan Sokhiev (dir.)', 'Vladimir Spivakov (violon)', '', [
            ['Fauré', '80'],
            ['Berg', 'ange'],
            ['Rachmaninov', '45'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '03/12/2017', '10:45', 'ONCT', 'Christophe Mangou (dir.)', 'Olivier Capelle (récitant)', 'Les Éclats (chœur d\'enfants et de jeunes), François Terrieux (chef de chœur), Hervé Carrère (livret)', [
            ['Maury', 'Fabrique'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '01/12/2017', '20:00', 'ONCT', 'Andris Poga (dir.)', 'Bertrand Chamayou (piano)', '', [
            ['Mendelssohn', '25'],
            ['Mahler', 'S6'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    
    //-------------------------------------------------------------------------
    // Novembre 2017
    //-------------------------------------------------------------------------
    
    [
        '25/11/2017', '20:00', 'ONCT', 'Kazuki Yamada (dir.)', '', '', [
            ['Ravel', 'MereOye'],
            ['Ravel', 'La Valse'],
            ['Ravel', 'Rapsodie'],
            ['Roussel', '43'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '18/11/2017', '18:00', 'ONCT', 'Kahchun Wong (dir.)', '', '', [
            ['Tchaïkovski', 'romeojuliette'],
            ['Dvorak', '95'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '12/11/2017', '10:45', 'ONCT', 'Christophe Mangou (dir.)', 'Régis Royer (comédien)', '', [
            ['Spécial', 'Galanta'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    
    //-------------------------------------------------------------------------
    // Octobre 2017
    //-------------------------------------------------------------------------
    
    [
        '24/10/2017', '20:00', 'ONCT', 'Nathan Fifield (dir.), Kader Belarbi (chorégraphie et mise en scène)', '', '', [
            ['Adam', 'Giselle'],
        ],
        'Toulouse', 'Théâtre du Capitole', 'Ballet',
    ],
    [
        '22/10/2017', '15:00', 'ONCT', 'Nathan Fifield (dir.), Kader Belarbi (chorégraphie et mise en scène)', '', '', [
            ['Adam', 'Giselle'],
        ],
        'Toulouse', 'Théâtre du Capitole', 'Ballet',
    ],
    [
        '21/10/2017', '20:00', 'ONCT', 'Nathan Fifield (dir.), Kader Belarbi (chorégraphie et mise en scène)', '', '', [
            ['Adam', 'Giselle'],
        ],
        'Toulouse', 'Théâtre du Capitole', 'Ballet',
    ],
    [
        '21/10/2017', '15:00', 'ONCT', 'Nathan Fifield (dir.), Kader Belarbi (chorégraphie et mise en scène)', '', '', [
            ['Adam', 'Giselle'],
        ],
        'Toulouse', 'Théâtre du Capitole', 'Ballet',
    ],
    [
        '21/10/2017', '20:00', 'ONCT', 'Nathan Fifield (dir.), Kader Belarbi (chorégraphie et mise en scène)', '', '', [
            ['Adam', 'Giselle'],
        ],
        'Toulouse', 'Théâtre du Capitole', 'Ballet',
    ],
    [
        '20/10/2017', '20:00', 'ONCT', 'Nathan Fifield (dir.), Kader Belarbi (chorégraphie et mise en scène)', '', '', [
            ['Adam', 'Giselle'],
        ],
        'Toulouse', 'Théâtre du Capitole', 'Ballet',
    ],
    [
        '19/10/2017', '20:00', 'ONCT', 'Nathan Fifield (dir.), Kader Belarbi (chorégraphie et mise en scène)', '', '', [
            ['Adam', 'Giselle'],
        ],
        'Toulouse', 'Théâtre du Capitole', 'Ballet',
    ],
    [
        '13/10/2017', '20:00', 'ONCT', 'Joseph Swensen (dir.)', 'Wayne Marshall (orgue)', '', [
            ['Bach', '565', 'Transcription pour orchestre de Stockowski'], // Transcription
            ['Widor', '42B'],
            ['Saint-Saëns', '78'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '05/10/2017', '20:00', 'ONCT', 'Maxim Emelyanychev (dir.)', 'Richard Goode (piano)', '', [
            ['Mendelssohn', '26'],
            ['Mozart', '456'],
            ['Mendelssohn', '56'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    
    //-------------------------------------------------------------------------
    // Septembre 2017
    //-------------------------------------------------------------------------
    
    [
        '20/09/2017', '20:00', 'ONCT', 'Tugan Sokhiev (dir.)', 'Elisabeth Leonskaja (piano)', '', [
            ['Mozart', '527ouv'],
            ['Beethoven', '37'],
            ['Chostakovitch', '70'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    
    //-------------------------------------------------------------------------
    // Début saison 2017-2018
    // Fin saison 2016-2017
    //-------------------------------------------------------------------------
    
    //-------------------------------------------------------------------------
    // Juin 2017
    //-------------------------------------------------------------------------
    
    [
        '09/06/2017', '20:00', 'ONCT', 'Gustavo Gimeno (dir.)', 'Adrien la Marca (alto)', '', [
            ['Schubert', '950'],
            ['Bartók', 'concerto_alto_posth'],
            ['Beethoven', '36'],
            ['Bartók', '19'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '02/06/2017', '20:00', 'ONCT', 'Antonello Manacorda (dir.)', 'Alexandra Conunova-Dumortier (violon)', '', [
            ['Beethoven', '62'],
            ['Brahms', '77'],
            ['Beethoven', '67'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    
    //-------------------------------------------------------------------------
    // Mai 2017
    //-------------------------------------------------------------------------
    
    [
        '27/05/2017', '20:00', 'ONCT', 'Kazuki Yamada (dir.)', 'Karine Deshayes (mezzo-soprano)', 'Chœur du capitole (chœur de femmes), Alfonso Caiani (Chef de chœur), Les Éclats (chœur d\'enfants et de jeunes), François Terrieux (Chef de chœur)', [
            ['Mahler', 'S3'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '19/05/2017', '20:00', 'ONCT', 'Tugan Sokhiev (dir.)', 'Marianne Crebassa (mezzo-soprano)', '', [
            ['Nielsen', '34'],
            ['Ravel', 'Shéhérazade'],
            ['Strauss', '54'],
            ['Stravinsky', 'suite_oiseau_1919'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
       '14/05/2017', '10:45', 'ONCT', 'Christophe Mangou (dir.)', 'Julie Martigny (livret et récit)', '', [
            ['Hérissier', 'Indigo']
       ],
       'Toulouse', 'Halle aux grains', 'Concert',
    ],
    
    //-------------------------------------------------------------------------
    // Avril 2017
    //-------------------------------------------------------------------------
    
    [
        '14/04/2017', '20:00', 'ONCT', 'Rafael Payare (dir.)', 'Benjamin Beilman (violon)', '', [
            ['Sibelius', '22'],
            ['Sibelius', '47'],
            ['Strauss', '30'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '07/04/2017', '20:00', 'ONCT', 'Joseph Swensen (dir.)', 'Adam Laloum (piano)', '', [
            ['Mozart', 'K271'],
            ['Bruckner', 'WAB 106'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    
    //-------------------------------------------------------------------------
    // Mars 2017
    //-------------------------------------------------------------------------
    
    [
        '25/03/2017', '20:00', 'ONCT', 'Christian Zacharias (dir. et piano)', '', '', [
            ['Schubert', '797'],
            ['Mozart', 'K453'],
            ['Schubert', '759'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '19/03/2017', '10:45', 'ONCT', 'Christophe Mangou (dir. et présentation)', '', '', [
            ['Stravinsky', 'oiseau_de_feu_extraits_symph'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    
    //-------------------------------------------------------------------------
    // Février 2017
    //-------------------------------------------------------------------------
    
    [
        '24/02/2017', '20:00', 'ONCT', 'Tugan Sokhiev (dir.)', 'Ferruccio Furlanetto (Don Quichotte)', 'Anna Kiknadze (Dulcinée), Andrii Goniukov (Sancho), Chœur du Capitole (chœur), Alfonso Caiani (chef de chœur)', [
            ['Massenet', 'donquichotte'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '17/02/2017', '20:00', 'ONCT', 'Tugan Sokhiev (dir.)', 'Lucas Debargue (piano)', '', [
            ['Debussy', 'faune'],
            ['Ravel', 'ConcertoPianoSolMajeur'],
            ['Chausson', '20'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '10/02/2017', '20:00', 'ONCT', 'Josep Pons (dir.)', 'Raphaël Sévère (clarinette)', '', [
            ['Mozart', '622'],
            ['Bruckner', '95'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '05/02/2017', '10:45', 'ONCT', 'Christophe Mangou (dir.)', 'Hervé Salliot (récitant)', 'Armée du Chahut (mise en scène)', [
            ['Poulenc', 'babar'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],

    //-------------------------------------------------------------------------
    // Janvier 2017
    //-------------------------------------------------------------------------
    
    [
        '28/01/2017', '18:00', 'ONCT', 'Lorenzo Viotti (dir.)', '', '', [
            ['Brahms', '73'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '27/01/2017', '20:00', 'ONCT', 'Lorenzo Viotti (dir.)', 'Daniel Lozakovitj (violon)', '', [
            ['Poulenc', 'animaux'],
            ['Chausson', '25'],
            ['Brahms', '73'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '20/01/2017', '20:00', 'ONCT', 'Rinaldo Alessandrini (dir.)', '', '', [
            ['Mozart', 'K16'],
            ['Beethoven', '21'],
            ['Schubert', '417'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '13/01/2017', '20:00', 'ONCT', 'Tugan Sokhiev (dir.)', 'Alison Balsom (trompette)', '', [
            ['Haydn', 'VIIE.1'],
            ['Chostakovitch', '60'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '01/01/2017', '18:00', 'ONCT', 'Wayne Marshall (dir.)', '', '', [
            ['Gershwin', 'TipToes'],
            ['Gershwin', 'AmericanInParis'],
            ['Gershwin', 'Cuban'],
            ['Bernstein', 'OnTheTownDance'],
            ['Bernstein', 'wss_danses'],
            ['Marquez', 'Danzon2'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],

    //-------------------------------------------------------------------------
    // Décembre 2016
    //-------------------------------------------------------------------------
    
    [
        '31/12/2016', '20:00', 'ONCT', 'Wayne Marshall (dir.)', '', '', [
            ['Gershwin', 'TipToes'],
            ['Gershwin', 'AmericanInParis'],
            ['Gershwin', 'Cuban'],
            ['Bernstein', 'OnTheTownDance'],
            ['Bernstein', 'wss_danses'],
            ['Marquez', 'Danzon2'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '17/12/2016', '18:00', 'ONCT', 'Tugan Sokhiev (dir.)', '', '', [
            ['Tchaïkovski', 'extraitsCasse'],
            ['Tchaïkovski', 'extraitsLac'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '16/12/2016', '20:00', 'ONCT', 'Tugan Sokhiev (dir.)', 'Claudia Barainsky (soprano), Garry Magee (baryton), Orfeón Donostiarra (choeur), José Antonio Sainz Alfaro (chef de choeur)', '', [
            ['Brahms', '45'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '15/12/2016', '20:00', 'ONCT', 'Tugan Sokhiev (dir.)', 'Claudia Barainsky (soprano), Garry Magee (baryton), Orfeón Donostiarra (choeur), José Antonio Sainz Alfaro (chef de choeur)', '', [
            ['Brahms', '45'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '09/12/2016', '20:00', 'ONCT', 'Tugan Sokhiev (dir.)', 'Jean-Yves Thibaudet (piano)', '', [
            ['Khatchatourian', 'cpianoré'],
            ['Strauss', '40'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '04/12/2016', '10:45', 'ONCT', 'Johan Farjot (dir.)', 'Les Éclats (chœur d\'enfants et de jeunes), François Terrieux (chef de chœur)', 'Allain Leprest (paroles)', [
            ['Didier', 'Pantin'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '02/12/2016', '20:00', 'ONCT', 'Christophe Mangou (dir.)', 'Jeff Mills (DJ)', '', [
            ['Mills', 'LightOutsideWorld'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '01/12/2016', '20:00', 'ONCT', 'Christophe Mangou (dir.)', 'Jeff Mills (DJ)', '', [
            ['Mills', 'LightOutsideWorld'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    
    //-------------------------------------------------------------------------
    // Novembre 2016
    //-------------------------------------------------------------------------
    
    [
        '24/11/2016', '20:00', 'ONCT', 'Tugan Sokhiev (dir.)', 'Vadim Gluzman (violon)', '', [
            ['Schnittke', 'SuiteStyleAncien'],
            ['Mozart', 'K216'],
            ['Mahler', 'S1'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '17/11/2016', '20:00', 'ONCT', 'Tugan Sokhiev (dir.)', 'Guy Braunstein (violon), István Várdai (violoncelle), Sunwook Kim (piano)', '', [
            ['Dufourt', 'ur'],
            ['Beethoven', '56'],
            ['Brahms', '98'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '12/11/2016', '18:00', 'ONCT', 'Sabrie Bekirova (dir.)', '', '', [
            ['Bizet', 'Carmen1'],
            ['Bizet', 'Carmen2'],
            ['Bizet', 'S1'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '04/11/2016', '20:00', 'ONCT', 'Lahav Shani (dir. et piano)', '', '', [
            ['Bernstein', 'candide'],
            ['Gershwin', 'Rhapsody'],
            ['Chostakovitch', '47'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    
    //-------------------------------------------------------------------------
    // Octobre 2016
    //-------------------------------------------------------------------------
    
    [
        '29/10/2016', '20:00', 'ONCT', 'Thomas Søndergård (dir.)', 'Vilde Frang (violon)', '', [
            ['WeinerL', '18'],
            ['Bartók', 'concerto_violon_1'],
            ['Sibelius', '43'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '15/10/2016', '20:00', 'ONCT', 'Andris Poga (dir.)', 'Alexandre Kniazev (violoncelle)', '', [
            ['Duruflé - De Boer', '5'],
            ['Chostakovitch', '107'],
            ['Tchaïkovski', '36'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '08/10/2016', '18:00', 'ONCT', 'Pierre Bleuse (dir.)', '', '', [
            ['StraussJ2', 'Bat'],
            ['Ravel', 'La Valse'],
            ['Ravel', 'DaphnisChloéSuite2']
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    
    //-------------------------------------------------------------------------
    // Septembre 2016
    //-------------------------------------------------------------------------
    
    [
        '17/09/2016', '20:00', 'ONCT', 'Tugan Sokhiev (dir.)', 'Christian Zacharias (piano)', '', [
            ['Beethoven', '73'],
            ['Berlioz', '14']
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    
    //-------------------------------------------------------------------------
    // Début saison 2016-2017
    // Fin saison 2015-2016
    //-------------------------------------------------------------------------
    
    //-------------------------------------------------------------------------
    // Juillet 2016
    //-------------------------------------------------------------------------
    
    [
        '02/07/2016', '20:00', 'ONCT', 'Tugan Sokhiev (dir.)', 'Nelson Freire (piano)', '', [
            ['Brahms', '83'],
            ['Brahms', '68']
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    
    //-------------------------------------------------------------------------
    // Juin 2016
    //-------------------------------------------------------------------------
    
    [
        '25/06/2016', '20:00', 'ONCT', 'Thomas Sondergard (dir.)', 'Inon Barnatan (piano)', '', [
            ['Beethoven', '72B'],
            ['Beethoven', '58'],
            ['Tchaïkovski', '17'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '17/06/2016', '20:00', 'ONCT', 'Bruno Mantovani (dir.)', 'Renaud Capuçon (violon), Olivier Stankiewicz (hautbois)', '', [
            ['Schoenberg', '16'],
            ['Mantovani', 'jeuxdeau'],
            ['Berio', 'chemin4'],
            ['Schubert', '485'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '12/06/2016', '15:00', 'BC', 'Oleg Vinogradov d\'après Marius Petipa, Maurice Béjard (chorégraphies)', 'Joop Stokvis décors et costumes, Oleg Vinogradov lumières, réalisées par Patrick Méeüs', 'Joëlle Roustan et Roger Bernard décors et costumes, Roger Bernard lumières', [ // 1h15
            ['Minkus', 'Paquita Grand Pas', 'Paquita Grand Pas'],
            ['Stravinsky', 'oiseausuiteX', 'L\'Oiseau de feu'],
        ],
        'Toulouse', 'Halle aux Grains', 'Ballet',
    ],
    [
        '11/06/2016', '20:00', 'BC', 'Oleg Vinogradov d\'après Marius Petipa, Maurice Béjard (chorégraphies)', 'Joop Stokvis décors et costumes, Oleg Vinogradov lumières, réalisées par Patrick Méeüs', 'Joëlle Roustan et Roger Bernard décors et costumes, Roger Bernard lumières', [ // 1h15
            ['Minkus', 'Paquita Grand Pas', 'Paquita Grand Pas'],
            ['Stravinsky', 'oiseausuiteX', 'L\'Oiseau de feu'],
        ],
        'Toulouse', 'Halle aux Grains', 'Ballet',
    ],
    [
        '10/06/2016', '20:00', 'BC', 'Oleg Vinogradov d\'après Marius Petipa, Maurice Béjard (chorégraphies)', 'Joop Stokvis décors et costumes, Oleg Vinogradov lumières, réalisées par Patrick Méeüs', 'Joëlle Roustan et Roger Bernard décors et costumes, Roger Bernard lumières', [ // 1h15
            ['Minkus', 'Paquita Grand Pas', 'Paquita Grand Pas'],
            ['Stravinsky', 'oiseausuiteX', 'L\'Oiseau de feu'],
        ],
        'Toulouse', 'Halle aux Grains', 'Ballet',
    ],
    [
        '09/06/2016', '20:00', 'ONBA', 'Alain Lombard (dir.)', '', '', [
            ['Bartók', 'cordes_percu_celesta'],
            ['Berlioz', '14'],
        ],
        'Bordeaux', 'Auditorium (Dutilleux)', 'Concert',
    ],
    [
        '09/06/2016', '20:00', 'BC', 'Oleg Vinogradov d\'après Marius Petipa, Maurice Béjard (chorégraphies)', 'Joop Stokvis décors et costumes, Oleg Vinogradov lumières, réalisées par Patrick Méeüs', 'Joëlle Roustan et Roger Bernard décors et costumes, Roger Bernard lumières', [ // 1h15
            ['Minkus', 'Paquita Grand Pas', 'Paquita Grand Pas'],
            ['Stravinsky', 'oiseausuiteX', 'L\'Oiseau de feu'],
        ],
        'Toulouse', 'Halle aux Grains', 'Ballet',
    ],
    [
        '08/06/2016', '20:00', 'BC', 'Oleg Vinogradov d\'après Marius Petipa, Maurice Béjard (chorégraphies)', 'Joop Stokvis décors et costumes, Oleg Vinogradov lumières, réalisées par Patrick Méeüs', 'Joëlle Roustan et Roger Bernard décors et costumes, Roger Bernard lumières', [ // 1h15
            ['Minkus', 'Paquita Grand Pas', 'Paquita Grand Pas'],
            ['Stravinsky', 'oiseausuiteX', 'L\'Oiseau de feu'],
        ],
        'Toulouse', 'Halle aux Grains', 'Ballet',
    ],
    
    //-------------------------------------------------------------------------
    // Mai 2016
    //-------------------------------------------------------------------------
    
    [
        '29/05/2016', '15:00', 'TC', '', '', '', [ // 2h45
            ['Rossini', 'L\'Italienne à Alger']
        ],
        'Toulouse', 'Théâtre du Capitole', 'Opéra',
    ],
    [
        '27/05/2016', '20:00', 'TC', '', '', '', [ // 2h45
            ['Rossini', 'L\'Italienne à Alger']
        ],
        'Toulouse', 'Théâtre du Capitole', 'Opéra',
    ],
    [
        '24/05/2016', '20:00', 'TC', '', '', '', [ // 2h45
            ['Rossini', 'L\'Italienne à Alger']
        ],
        'Toulouse', 'Théâtre du Capitole', 'Opéra',
    ],
    [
        '22/05/2016', '15:00', 'TC', '', '', '', [ // 2h45
            ['Rossini', 'L\'Italienne à Alger']
        ],
        'Toulouse', 'Théâtre du Capitole', 'Opéra',
    ],
    [
        '20/05/2016', '20:00', 'ONBA', 'Geoffrey Styles (dir.)', '', '', [
            ['Spécial', 'Programme spécial']
        ],
        'Bordeaux', 'Auditorium (Dutilleux)', 'Concert',
    ],
    [
        '20/05/2016', '20:00', 'TC', '', '', '', [ // 2h45
            ['Rossini', 'L\'Italienne à Alger']
        ],
        'Toulouse', 'Théâtre du Capitole', 'Opéra',
    ],
    [
        '19/05/2016', '20:00', 'ONCT', 'Tugan Sokhiev (dir.)', 'Gautier Capuçon (violoncelle)', '', [
            ['Messiaen', 'offrandes'],
            ['Dutilleux', 'toutunmondelointain'],
            ['Debussy', 'lamer'],
            ['Stravinsky', 'oiseausuite2'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '17/05/2016', '20:00', 'TC', '', '', '', [ // 2h45
            ['Rossini', 'L\'Italienne à Alger']
        ],
        'Toulouse', 'Théâtre du Capitole', 'Opéra',
    ],
    [
        '13/05/2016', '19:00', 'ONBA', 'Michel Plasson (dir.)', 'Sarah Kim (orgue)', '', [
            ['Tanguy', 'Intrada'],
            ['Ravel', 'M.61'],
            ['Ravel', 'La Valse'],
            ['Saint-Saëns', '78'],
        ],
        'Bordeaux', 'Auditorium (Dutilleux)', 'Concert',
    ],
    [
        '12/05/2016', '20:00', 'ONBA', 'Michel Plasson (dir.)', 'Sarah Kim (orgue)', '', [
            ['Tanguy', 'Intrada'],
            ['Ravel', 'M.61'],
            ['Ravel', 'La Valse'],
            ['Saint-Saëns', '78'],
        ],
        'Bordeaux', 'Auditorium (Dutilleux)', 'Concert',
    ],
    
    //-------------------------------------------------------------------------
    // Avril 2016
    //-------------------------------------------------------------------------
    
    [
        '29/04/2016', '20:00', 'ONCT', 'Tugan Sokhiev (dir.)', 'Julie Boulianne (mezzo-soprano), Loïc Félix (ténor), Orfeón Donostiarra (chœur), José Antonio Sainz Alfaro (chef de chœur)', '', [
            ['Berlioz', '17'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '28/04/2016', '20:00', 'ONBA', 'Paul Daniel (dir.)', 'Aude Extrémo (contre-alto)', 'Chœur de l’Opéra National de Bordeaux, Salvatore Caputo, chef de chœur, Chœur de l\'Armée Française, sous la direction d\'Aurore Tillac', [
            ['Prokofiev', 'Alexandre Nevski'],
            ['Walton', 'Henry V'],
        ],
        'Bordeaux', 'Auditorium (Dutilleux)', 'Concert',
    ],
    [
        '26/04/2016', '20:00', 'TC', '', '', '', [ // 3h20
            ['Mozart', 'Les Noces de Figaro'],
        ],
        'Toulouse', 'Théâtre du Capitole', 'Opéra',
    ],
    [
        '24/04/2016', '15:00', 'TC', '', '', '', [ // 3h20 audiodescription
            ['Mozart', 'Les Noces de Figaro'],
        ],
        'Toulouse', 'Théâtre du Capitole', 'Opéra',
    ],
    [
        '23/04/2016', '18:00', 'ONCT', 'Pierre Bleuse (dir.)', '', '', [
            ['Bernstein', 'candide'],
            ['Gershwin', 'AmericanInParis'],
            ['Bernstein', 'wss_danses'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '22/04/2016', '20:00', 'TC', '', '', '', [ // 3h20 audiodescription
            ['Mozart', 'Les Noces de Figaro'],
        ],
        'Toulouse', 'Théâtre du Capitole', 'Opéra',
    ],
    [
        '19/04/2016', '20:00', 'TC', '', '', '', [ // 3h20
            ['Mozart', 'Les Noces de Figaro'],
        ],
        'Toulouse', 'Théâtre du Capitole', 'Opéra',
    ],
    [
        '17/04/2016', '15:00', 'TC', '', '', '', [ // 3h20
            ['Mozart', 'Les Noces de Figaro'],
        ],
        'Toulouse', 'Théâtre du Capitole', 'Opéra',
    ],
    [
        '17/04/2016', '15:00', 'BC', 'Kader Belarbi, Angel Rodriguez, Kader Belarbi (chorégraphies)', 'Michaela Buerger (costumes), Patrick Méeüs (lumières)', 'Paradis Perdus / Nos mémoires enfouies', [ // (1h45)
            ['Prokofiev', 'Pièces pour piano pour Salle des pas perdus', 'Salle des pas perdus'],
            ['Bryars', 'Les Fiançailles', 'Thousand of Thoughts'],
            ['Dallapiccola', 'Canti di Prigionia', 'Mur-Mur'],
        ],
        'Toulouse', 'Saint-Pierre-des-Cuisine', 'Ballet', // Auditorium 
    ],
    [
        '16/04/2016', '20:00', 'BC', 'Kader Belarbi, Angel Rodriguez, Kader Belarbi (chorégraphies)', 'Michaela Buerger (costumes), Patrick Méeüs (lumières)', '', [
            ['Prokofiev', 'Pièces pour piano pour Salle des pas perdus', 'Salle des pas perdus'],
            ['Bryars', 'Les Fiançailles', 'Thousand of Thoughts'],
            ['Dallapiccola', 'Canti di Prigionia', 'Mur-Mur'],
        ],
        'Toulouse', 'Saint-Pierre-des-Cuisine', 'Ballet', // Auditorium 
    ],
    [
        '15/04/2016', '20:00', 'TC', '', '', '', [ // 3h20
            ['Mozart', 'Les Noces de Figaro'],
        ],
        'Toulouse', 'Théâtre du Capitole', 'Opéra',
    ],
    [
        '15/04/2016', '20:00', 'BC', 'Kader Belarbi, Angel Rodriguez, Kader Belarbi (chorégraphies)', 'Michaela Buerger (costumes), Patrick Méeüs (lumières)', '', [
            ['Prokofiev', 'Pièces pour piano pour Salle des pas perdus', 'Salle des pas perdus'],
            ['Bryars', 'Les Fiançailles', 'Thousand of Thoughts'],
            ['Dallapiccola', 'Canti di Prigionia', 'Mur-Mur'],
        ],
        'Toulouse', 'Saint-Pierre-des-Cuisine', 'Ballet', // Auditorium 
    ],
    [
        '14/04/2016', '20:00', 'BC', 'Kader Belarbi, Angel Rodriguez, Kader Belarbi (chorégraphies)', 'Michaela Buerger (costumes), Patrick Méeüs (lumières)', '', [
            ['Prokofiev', 'Pièces pour piano pour Salle des pas perdus', 'Salle des pas perdus'],
            ['Bryars', 'Les Fiançailles', 'Thousand of Thoughts'],
            ['Dallapiccola', 'Canti di Prigionia', 'Mur-Mur'],
        ],
        'Toulouse', 'Saint-Pierre-des-Cuisine', 'Ballet', // Auditorium 
    ],
    [
        '13/04/2016', '20:00', 'BC', 'Kader Belarbi, Angel Rodriguez, Kader Belarbi (chorégraphies)', 'Michaela Buerger (costumes), Patrick Méeüs (lumières)', '', [
            ['Prokofiev', 'Pièces pour piano pour Salle des pas perdus', 'Salle des pas perdus'],
            ['Bryars', 'Les Fiançailles', 'Thousand of Thoughts'],
            ['Dallapiccola', 'Canti di Prigionia', 'Mur-Mur'],
        ],
        'Toulouse', 'Saint-Pierre-des-Cuisine', 'Ballet', // Auditorium 
    ],
    [
        '07/04/2016', '20:00', 'ONBA', 'Paul Daniel (dir.)', 'Chœur de femmes de l\'Opéra National de Bordeaux, Chef de chœur, Salvatore Caputo', 'Chloé Briot, Alice Ferrière (sopranos), Juliette Deschamps, réalisation vidéo et adaptation du texte', [
            ['Mendelssohn', 'songe'],
        ],
        'Bordeaux', 'Auditorium (Dutilleux)', 'Concert',
    ],
    
    //-------------------------------------------------------------------------
    // Mars 2016
    //-------------------------------------------------------------------------
    
    [
        '26/03/2016', '20:00', 'ONCT', 'Andris Poga (dir.)', 'Fazil Say (piano)', '', [
            ['Dalbavie', 'color'],
            ['Say', 'water'],
            ['Chostakovitch', '10'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '24/03/2016', '20:00', 'ONBA', 'Paul Daniel (dir.)', 'Laurent Dupéré (trompette)', '', [
            ['Zimmermann', 'nobody'],
            ['Mahler', 'S6'],
        ],
        'Bordeaux', 'Auditorium (Dutilleux)', 'Concert',
    ],
    [ 
        '22/03/2016', '20:00', 'BC', 'Charles Jude', '', '', [
            ['Delibes', 'Coppélia']
        ],
        'Toulouse', 'Théâtre du Capitole', 'Ballet',
    ],
    [ 
        '20/03/2016', '15:00', 'BC', 'Charles Jude', '', '', [
            ['Delibes', 'Coppélia']
        ],
        'Toulouse', 'Théâtre du Capitole', 'Ballet',
    ],
    [
        '20/03/2016', '10:45', 'ONCT', 'Christophe Mangou (dir. & présentation)', 'Hervé Salliot (récitant)', '', [
            ['Lehman', 'alibaba'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [ 
        '19/03/2016', '20:00', 'BC', 'Charles Jude', '', '', [
            ['Delibes', 'Coppélia']
        ],
        'Toulouse', 'Théâtre du Capitole', 'Ballet',
    ],
    [ 
        '19/03/2016', '15:00', 'BC', 'Charles Jude', '', '', [
            ['Delibes', 'Coppélia']
        ],
        'Toulouse', 'Théâtre du Capitole', 'Ballet',
    ],
    [ 
        '18/03/2016', '20:00', 'BC', 'Charles Jude', '', '', [
            ['Delibes', 'Coppélia']
        ],
        'Toulouse', 'Théâtre du Capitole', 'Ballet',
    ],
    [ 
        '17/03/2016', '20:00', 'BC', 'Charles Jude', '', '', [
            ['Delibes', 'Coppélia']
        ],
        'Toulouse', 'Théâtre du Capitole', 'Ballet',
    ],
    [
        '11/03/2016', '20:00', 'ONCT', 'Vladimir Spivakov (dir.)', 'Anastasia Kobekina (violoncelle)', '', [
            ['Tchaïkovski', 'romeojuliette'],
            ['Tchaïkovski', '33'],
            ['Rachmaninov', '45'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '04/03/2016', '20:00', 'ONCT', 'Tugan Sokhiev (dir.)', 'Vadim Gluzman (violon)', '', [
            ['Azagra', 'Prelude'],
            ['Beethoven', '61'],
            ['Bartók', 'op. 13, Sz. 60']
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    
    //-------------------------------------------------------------------------
    // Février 2016
    //-------------------------------------------------------------------------
    
    [
        '28/02/2016', '15:00', 'TC', 'William Christie et Robert Carsen', '', '', [
            ['Campra', 'Les Fêtes Vénitiennes']
        ],
        'Toulouse', 'Théâtre du Capitole', 'Opéra',
    ],
    [
        '27/02/2016', '20:00', 'ONCT', 'Thomas Søndergård (dir.)', 'Geneviève Laurenceau (violon)', '', [
            ['Bruch', '84'],
            ['Attahir', 'NBruch'],
            ['Mahler', 'S5'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '26/02/2016', '20:00', 'TC', 'William Christie et Robert Carsen', '', '', [
            ['Campra', 'Les Fêtes Vénitiennes']
        ],
        'Toulouse', 'Théâtre du Capitole', 'Opéra',
    ],
    [
        '25/02/2016', '20:00', 'ONBA', 'Yasuaki Itakura (dir.)', 'Sébastien Batut, Sandrine Vasseur, Stéphane Kwiatek, Richard Rimbert (clarinettes)', 'Jean-Philippe Guillo, Thomas Besnard (pianos)', [
            ['Debussy', 'Rhapsodie n°1 pour clarinette'],
            ['Agobet', 'Génération, pour 3 clarinettes'],
            ['Spécial', 'Clarinettes250216'], // Ensemble de Clarinettes (pièce de 4 minutes, jouée par 150 élèves clarinettistes de Gironde) 
            ['Takemitsu', 'Quotation of a dream'],
            ['Debussy', 'lamer'],
        ],
        'Bordeaux', 'Auditorium (Dutilleux)', 'Concert',
    ],
    [
        '25/02/2016', '20:00', 'TC', 'William Christie et Robert Carsen', '', '', [
            ['Campra', 'Les Fêtes Vénitiennes']
        ],
        'Toulouse', 'Théâtre du Capitole', 'Opéra',
    ],
    [
        '23/02/2016', '20:00', 'TC', 'William Christie et Robert Carsen', '', '', [
            ['Campra', 'Les Fêtes Vénitiennes']
        ],
        'Toulouse', 'Théâtre du Capitole', 'Opéra',
    ],
    [
        '19/02/2016', '20:00', 'ONCT', 'Hartmut Haenchen (dir.)', 'Isabelle van Keulen (violon)', '', [
            ['Martinů', 'MemorialLidice'],
            ['Hartmann', 'ConcertoFunebre'],
            ['Strauss', '64'],   
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '14/02/2016', '10:45', 'ONCT', 'Nicholas Collon (dir.)', '', '', [
            ['Holst', '32'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '12/02/2016', '20:00', 'ONCT', 'Nicholas Collon (dir.)', 'Chad Hoopes (violon)', '', [
            ['Ravel', 'M.61'], 
            ['Adams', 'ConViolon1993'], 
            ['Holst', '32']
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '6/02/2016', '18:00', 'ONCT', 'Gustavo Gimeno (dir.)', '', '', [
            ['Beethoven', '55'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '05/02/2016', '19:00', 'ONBA', 'Paul Daniel (dir.)', 'Matthieu Arama (violon)', '', [
            ['Liadov', '62'],
            ['Glazounov', 'extraitsRaymonda04022016'],
            ['Tchaïkovski', 'extraitsBelle04022016'],
            ['Tchaïkovski', 'extraitsLac04022016'],
            ['Tchaïkovski', '74'],
        ],
        'Bordeaux', 'Auditorium (Dutilleux)', 'Concert',
    ],
    [
        '05/02/2016', '20:00', 'ONCT', 'Gustavo Gimeno (dir.)', 'Nicholas Angelich (piano)', '', [
            ['Ravel', 'MereOye'],
            ['Ravel', 'ConcertoPianoSolMajeur'],
            ['Beethoven', '55'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '04/02/2016', '20:00', 'ONBA', 'Paul Daniel (dir.)', 'Matthieu Arama (violon)', '', [
            ['Liadov', '62'],
            ['Glazounov', 'extraitsRaymonda04022016'],
            ['Tchaïkovski', 'extraitsBelle04022016'],
            ['Tchaïkovski', 'extraitsLac04022016'],
            ['Tchaïkovski', '74'],
        ],
        'Bordeaux', 'Auditorium (Dutilleux)', 'Concert',
    ],
    
    //-------------------------------------------------------------------------
    // Janvier 2016
    //-------------------------------------------------------------------------
    
    [
        '31/01/2016', '10:45', 'ONCT', 'Christophe Mangou (dir. et présentation)', '', '', [
            ['Spécial', 'tourdumonde'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ], 
    [
        '22/01/2016', '20:00', 'ONCT', 'Josep Pons (dir.)', 'François-Frédéric Guy (piano)', '', [
            ['Wagner', 'Tristan und Isolde, Prélude et « Liebestod »'],
            ['Beethoven', '37'],
            ['Wagner', 'Parsifal, Ouverture et « Enchantement du Vendredi Saint »'],
            ['Wagner', 'Götterdämmerung, Extraits'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '16/01/2016', '18:00', 'ONCT', 'Giovanni Antonini (dir.)', '', '', [
            ['Mozart', 'K297'],
            ['Beethoven', '68'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '15/01/2016', '20:00', 'ONCT', 'Giovanni Antonini (dir.)', 'Emmanuel Pahud (flûte)', '', [
            ['Mozart', 'K297'],
            ['Mozart', 'K315'],
            ['Devienne', 'cfo7'],
            ['Beethoven', '68'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '01/01/2016', '18:00', 'ONCT', 'Tugan Sokhiev (dir.)', 'Alexeï Ogrintchouk (hautbois)', '', [
            // CONCERTS DU NOUVEL AN : UN NOUVEL AN RUSSE EN COMPAGNIE DE TUGAN SOKHIEV
            ['Tchaïkovski', 'BABD:Valse6'],
            ['Tchaïkovski', 'SW:Spe1'],
            ['Tchaïkovski', 'CN:Spe1'],
            ['Bellini', 'ConcertoHauboisMiBémolMajeur'],
            ['Chostakovitch', 'Jazz2'],
            ['Khatchatourian', 'DanseSabre'],
            ['Chostakovitch', 'TahitiTrot'],
            ['Stravinsky', 'OF:Spe1'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    
    //-------------------------------------------------------------------------
    // Décembre
    //-------------------------------------------------------------------------
 
    [
        '31/12/2015', '20:00', 'ONCT', 'Tugan Sokhiev (dir.)', 'Alexeï Ogrintchouk (hautbois)', '', [
            // CONCERTS DU NOUVEL AN : UN NOUVEL AN RUSSE EN COMPAGNIE DE TUGAN SOKHIEV
            ['Tchaïkovski', 'BABD:Valse6'],
            ['Tchaïkovski', 'SW:Spe1'],
            ['Tchaïkovski', 'CN:Spe1'],
            ['Bellini', 'ConcertoHauboisMiBémolMajeur'],
            ['Chostakovitch', 'Jazz2'],
            ['Khatchatourian', 'DanseSabre'],
            ['Chostakovitch', 'TahitiTrot'],
            ['Stravinsky', 'OF:Spe1'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '18/12/2015', '20:00', 'ONCT', 'Georges Prêtre (dir.)', 'Adam Laloum (piano pour moz et schu)', 'Eric Crambes (dir. violon solo pour moz)', [
            ['Beethoven', '84'],
            ['Mozart', 'K488'],
            ['StraussJ2', 'Bat'],
            ['Schubert', '935'],
            ['Offenbach', 'CdH:Barcarolle'],
            ['Ravel', 'Boléro'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '13/12/2015', '10:45', 'ONCT', 'François Terrieux (dir. et chef de choeur)', 'Hervé Suhubiette (récitant et chant)', 'Eloïse Chadourne (chant), Les éclats (choeur d\'enfants), Fabrice Guérin (mise en scène)', [
            ['Suhubiette' , 'Gâteaux et chapeaux'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '09/12/2015', '20:00', 'ONCT', 'Tugan Sokhiev (dir.)', 'David Minetti (clarinette)', 'Olivier Stankiewicz (hautbois), Jacques Deleplancque (cor), Estelle Richard (basson)', [
            ['Mozart', 'KV297b'],
            ['Chostakovitch', '93'],            
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '04/12/2015', '20:00', 'ONCT', 'Tugan Sokhiev (dir.)', 'Ferruccio Furlanetto (basse)', 'Choeur du Capitole (choeur), Alfonso Caiani (chef de coeur)', [
            // Verdi : Airs d’opéras Don Carlo, Nabucco, Ernani, Simon Boccanegra, Vespri Siciliani, Macbeth
            ['Verdi', 'Force du Destin : Ouverture'],
            ['Verdi', 'Don Carlo : Acte II, Choeur et aria (Il Frate) « Carlo, il sommo Imperatore… »'],
            ['Verdi', 'Simon Boccanegra : Acte III, Prologue, récitatif avec choeur « A te l’estremo addio… »'],
            ['Verdi', 'Nabucco : Gli arredi festivi (Choeur d’introduction du 1er acte)'],
            ['Verdi', 'Traviata : Prélude'],
            ['Verdi', 'Nabucco : Acte II, Air de Zaccaria. Preghiera « Vieni, o Levita ! », « Tu sul labro… »'],
            ['Verdi', 'Nabucco : Va’ pensiero'],
            ['Verdi', 'Macbeth (version Paris 1865) : Acte II, n°10, recitatif “Studia il passo” + Air de Banco “Come dal ciel precipita”'],
            ['Verdi', 'Les Vêpres siciliennes : Ouverture'],
            ['Verdi', 'Les Vêpres siciliennes : Acte II, scène 1 (n°7) : Air de Giovanni da Procida « O patria o cara », « O tu Palermo ».'],
            ['Verdi', 'Otello : Fuoco di gioia (1er acte) '],
            ['Verdi', 'Ernani : Acte I, scène 9 (final), récitatif : « Che mai veggio » + air de Silva « Infelice !... e tuo credevi »'],
            ['Verdi', 'Nabucco : Ouverture'],
            ['Verdi', 'Don Carlo : Acte IV, Air de Filippo « Ella Giammai m’ amo »'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    
    //-------------------------------------------------------------------------
    // Novembre
    //-------------------------------------------------------------------------
    
    [
        '15/11/2015', '10:45', 'ONCT', 'Christophe Mangou (dir. et présentation)', 'Maëlle Mietton (récitante)', '', [
            ['Spécial', 'BabaYaga'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '06/11/2015', '20:00', 'ONCT', 'Kazuki Yamada (dir.)', 'Edgar Moreau (violoncelle)', '', [
            ['Escaich', 'ClaudeSuite'],
            ['Saint-Saëns', '33'],
            ['Ravel', 'DaphnisChloéSuite2'],
            ['Ravel', 'Boléro'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    
    //-------------------------------------------------------------------------
    // Octobre
    //-------------------------------------------------------------------------
    
    [
        '30/10/2015', '20:00', 'ONCT', 'Lahav Shani (dir.)', 'Philippe Bianconi (piano)', '', [
            ['Prokofiev', '91'],
            ['Schumann', '54'],
            ['Prokofiev', '100'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '23/10/2015', '20:00', 'ONCT', 'Joseph Swensen (dir.)', 'Itamar Zorman (violon)', '', [
            ['Mendelssohn', '64'],
            ['Bruckner', '109'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '17/10/2015', '20:00', 'ONCT', 'Rinaldo Alessandrini (dir.)', 'Anaïs Constans (soprano)', '', [
            ['Mozart', 'Nozze di Figaro, Ouverture et La deuxième comtesse « Dove sono »'],
            ['Mozart', 'Don Giovanni, Ouverture et Air de Zerlina - Vedrai carino'],
            ['Mozart', 'Così fan tutte, Ouverture et Air de Despina - Una donna a quindici anni »'],
            ['Mozart', '551'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    [
        '14/10/2015', '20:00', 'ONCT', 'Tugan Sokhiev (dir.)', 'Cameron Carpenter (orgue)', '', [
            ['Gershwin', '3songs'],
            ['Barber', '36'],
            ['Tchaïkovski', '55'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
    
    //-------------------------------------------------------------------------
    // Septembre
    //-------------------------------------------------------------------------
    
    [
        '18/09/2015', '20:00', 'ONCT', 'Tugan Sokhiev (dir.)', 'Elisabeth Leonskaja (piano)', '', [
            ['Schubert', '644'],
            ['Grieg', '16'],
            ['Dvorak', '88'],
        ],
        'Toulouse', 'Halle aux grains', 'Concert',
    ],
];

// FIN DATE

var authors_abc = [
    'Adam',
    'Adams',
    'Agobet',
    'Attahir',
    'Azagra',
    'Bach',
    'Barber',
    'Bartók',
    'Beethoven',
    'Bellini',
    'Berio',
    'Berg',
    'Berlioz',
    'Bernstein',
    'Bizet',
    'Boulez',
    'Brahms',
    'Bruch',
    'Bruckner',
    'Bryars',
    'Campra',
    'Chabrier',
    'Chausson',
    'Chen',
    'Cherubini',
    'Chostakovitch',
    'Dalbavie',
    'Dallapiccola',
    'Debussy',
    'Delibes',
    'Devienne',
    'Didier',
    'Dufourt',
    'Duruflé - De Boer',
    'Dutilleux',
    'Dvorak',
    'Escaich',
    'Falla',
    'Fauré',
    'Gershwin',
    'Ginastera',
    'Glazounov',
    'Grieg',
    'Hartmann',
    'Haydn',
    'Hérissier',
    'Holst',
    'Khatchatourian',
    'Lalo',
    'Lehman',
    'Liadov',
    'Mahler',
    'Mantovani',
    'Marquez',
    'Martinů',
    'Massenet',
    'Maury',
    'Mendelssohn',
    'Messiaen',
    'Mills',
    'Minkus',
    'Mozart',
    'Nielsen',
    'Offenbach',
    'Prokofiev',
    'Puccini',
    'Rachmaninov',
    'Ravel',
    'Respighi',
    'Rossini',
    'Roussel',
    'Saint-Saëns',
    'Say',
    'Schnittke',
    'Schoenberg',
    'Schubert',
    'Schumann',
    'Sibelius',
    'StraussJ2',
    'Strauss',
    'Stravinsky',
    'Suhubiette' ,
    'Takemitsu',
    'Tanguy',
    'Tchaïkovski',
    'Varèse',
    'Verdi',
    'Wagner',
    'Walton',
    'WeinerL',
    'Widor',
    'Williams',
    'Zimmermann',
    'Zygel',
];

var months = {
    '01' : 'jan.',
    '02' : 'fév.',
    '03' : 'mars',
    '04' : 'avril',
    '05' : 'mai',
    '06' : 'juin',
    '07' : 'juil.',
    '08' : 'août',
    '09' : 'sept.',
    '10' : 'oct.',
    '11' : 'nov.',
    '12' : 'déc.',
};

var org_disp = {
    'BC' : 'Ballet du Capitole',
    'TC' : 'Théâtre du Capitole',
    'ONCT' : 'Orch. Nat. du Capitole',
    'ONBA' : 'Orch. Nat. Bordeaux Aquitaine',
};
