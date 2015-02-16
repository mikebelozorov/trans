/**
 * Created by MikeBelozorov on 15.12.2014.
 */

Translator.key = {
    'begin': 1,
    'end': 2,
    'integer': 3,
    'string': 4,
    'read': 5,
    'write': 6,
    'var': 7,
    'if': 8,
    'then': 9,
    'else': 10,
    'while': 11,
    'do': 12,
    'for': 13,
    'to': 14,
    'and': 15,
    'or': 16,
    ';': 20,
    'отнош.': 21,
    '=': [21, 0],
    '<>': [21, 1],
    '<': [21, 2],
    '>': [21, 3],
    '<=': [21, 4],
    '>=': [21, 5],
    '+-': 22,
    '+': [22, 0],
    '-': [22, 1],
    '*': [23, 0],
    '/': [23, 1],
    '*/': 23,
    ':=': 24,
    '(': 25,
    ')': 26,
    ':': 27,
    '.': 28,
    ',': 29,
    'identifier': 30,
    'const_num': 40,
    'const_str': 41
};

Translator.tableSyntax = {
    '<программа>': {
        'var'			: ['<объявление переменных>', '<тело программы>']
    },
    '<объявление переменных>': {
        'var'			: [Translator.key['var'],  '<список переменных>']
    },
    '<список переменных>': {
        'identifier'	: ['<блок переменных>', Translator.key[';'], '<список переменных>'],
        'begin'			: ['#']
    },
    '<блок переменных>': {
        'identifier'	: ['<список имен>' , Translator.key[':'] , '<тип>']
    },
    '<список имен>': {
        'identifier'	: [Translator.key['identifier'], '<спис.имен>']
    },
    '<спис.имен>': {
        ','				: [Translator.key[','], '<список имен>'],
        ':'				: ['#']
    },
    '<тип>': {
        'integer'		: [Translator.key['integer']],
        'string'		: [Translator.key['string']]
    },
    '<тело программы>': {
        'begin'			: [Translator.key['begin'], '<посл. операторов>', Translator.key['end'], Translator.key['.']]
    },
    '<посл. операторов>': {
        'identifier'	: ['<оператор>', Translator.key[';'], '<посл. операторов>'],
        'if'			: ['<оператор>', Translator.key[';'], '<посл. операторов>'],
        'while'			: ['<оператор>', Translator.key[';'], '<посл. операторов>'],
        'for'			: ['<оператор>', Translator.key[';'], '<посл. операторов>'],
        'write'			: ['<оператор>', Translator.key[';'], '<посл. операторов>'],
        'read'			: ['<оператор>', Translator.key[';'], '<посл. операторов>'],
        'begin'			: ['<оператор>', Translator.key[';'], '<посл. операторов>'],
        'end'			: ['#']
    },
    '<else>': {
        'else'			: [Translator.key['else'], '<оператор>'],
        ';'				: ['#']
    },
    '<оператор>': {
        'identifier'	: [Translator.key['identifier'] , Translator.key[':='] , '<выражение>'],
        'if'			: [Translator.key['if'], '<условие>', Translator.key['then'], '<оператор>', '<else>'],
        'while'			: [Translator.key['while'], '<условие>', Translator.key['do'], '<оператор>'],
        'for'			: [Translator.key['for'], Translator.key['identifier'], Translator.key[':='], '<числ. выражение>', Translator.key['to'], '<числ. выражение>', Translator.key['do'], '<оператор>'],
        'write'			: [Translator.key['write'], Translator.key['('], '<выражение>', Translator.key[')']],
        'read'			: [Translator.key['read'], Translator.key['('], Translator.key['identifier'], Translator.key[')']],
        'begin'			: [Translator.key['begin'], '<посл. операторов>', Translator.key['end']],
        'end'			: ['#']
    },
    '<условие>': {
        'identifier'	: ['<сравнение>', '<усл.>'],
        'const_str'		: ['<сравнение>', '<усл.>'],
        'const_num'		: ['<сравнение>', '<усл.>'],
        '('				: ['<сравнение>', '<усл.>']
    },
    '<отнош.>': {
        '='				: [Translator.key['='] , '<выражение>'],
        '<>'			: [Translator.key['<>'] , '<выражение>'],
        '<'				: [Translator.key['<'] , '<выражение>'],
        '>'				: [Translator.key['>'] , '<выражение>'],
        '<='			: [Translator.key['<='] , '<выражение>'],
        '>='			: [Translator.key['>='] , '<выражение>']
    },
    '<усл.>': {
        'and'			: ['<лог. оператор>', '<условие>'],
        'or'			: ['<лог. оператор>', '<условие>'],
        'then'			: ['#'],
        ')'				: ['#'],
        'do'			: ['#']
    },
    '<сравнение>': {
        'identifier'	: ['<выражение>','<отнош.>'],
        'const_str'		: ['<выражение>','<отнош.>'],
        'const_num'		: ['<выражение>','<отнош.>'],
        '('				: ['<выражение>','<отнош.>']
    },
    '<лог. оператор>': {
        'then'			: ['#'],
        'do'			: ['#'],
        'and'			: [Translator.key['and']],
        'or'			: [Translator.key['or']]
    },
    '<выражение>': {
        'identifier'	: ['<числ. выражение>'],
        'const_str'		: ['<стр. выражение>'],
        'const_num'		: ['<числ. выражение>'],
        '('				: ['<числ. выражение>']
    },
    '<числ. выражение>': {
        'identifier'	: ['<терм>', '<action>'],
        'const_num'		: ['<терм>', '<action>'],
        '('				: ['<терм>', '<action>']
    },
    '<action>': {
        'then'			: ['#'],
        'do'			: ['#'],
        '+'				: [Translator.key['+'], '<числ. выражение>'],
        '-'				: [Translator.key['-'], '<числ. выражение>'],
        '/'				: [Translator.key['/'], '<числ. выражение>'],
        '*'				: [Translator.key['*'], '<числ. выражение>'],
        ')'				: ['#'],
        ';'				: ['#'],
        '='				: ['#'],
        'and'			: ['#'],
        'or'			: ['#'],
        'to'			: ['#'],
        '>'				: ['#'],
        '<'				: ['#'],
        '<>'			: ['#'],
        '<='			: ['#'],
        '>='			: ['#']
    },
    '<терм>': {
        '('				: [Translator.key['('], '<числ. выражение>', Translator.key[')']],
        'identifier'	: [Translator.key['identifier']],
        'const_num'		: [Translator.key['const_num']]
    },
    '<стр. выражение>': {
        'identifier'	: ['<стр. терм>', '<straction>'],
        'const_str'		: ['<стр. терм>', '<straction>']
    },
    '<straction>': {
        '+'				: [Translator.key['+'], '<стр. выражение>'],
        'then'			: ['#'],
        'do'			: ['#'],
        ';'				: ['#'],
        '='				: ['#'],
        '<>'			: ['#'],
        '<'				: ['#'],
        '>'				: ['#'],
        '<='			: ['#'],
        '>='			: ['#'],
        'and'			: ['#'],
        'or'			: ['#'],
        ')'				: ['#']
    },
    '<стр. терм>': {
        'identifier'	: [Translator.key['identifier']],
        'const_str'		: [Translator.key['const_str']]
    }
};

Translator.tableGenerate = {
    '<программа>': {
        'var'			: ['#include <stdio.h>\n#include <string>\n#include <iostream>\n','<объявление переменных>', '<тело программы>']
    },
    '<объявление переменных>': {
        'var'			: [ '<список переменных>']
    },
    '<список переменных>': {
        'identifier'	: ['<блок переменных>', ';', '<список переменных>'],
        'begin'			: ['#']
    },
    '<блок переменных>': {
        'identifier'	: ['<тип>', '<список имен>']
    },
    '<список имен>': {
        'identifier'	: [Translator.key['identifier'], '<спис.имен>']
    },
    '<спис.имен>': {
        ','				: [',', '<список имен>'],
        ':'				: ['#']
    },
    '<тип>': {
        'integer'		: ['\nint           '],
        'string'		: ['\nstd::string   ']
    },
    '<тело программы>': {
        'begin'			: ['\n\nint main()\n{', '<посл. операторов>', '\n    return 0;\n}']
    },
    '<посл. операторов>': {
        'identifier'	: ['\n    ','<оператор>', ';', '<посл. операторов>'],
        'if'			: ['\n    ','<оператор>', ';', '<посл. операторов>'],
        'while'			: ['\n    ','<оператор>', ';', '<посл. операторов>'],
        'for'			: ['\n    ','<оператор>', ';', '<посл. операторов>'],
        'write'			: ['\n    ','<оператор>', ';', '<посл. операторов>'],
        'read'			: ['\n    ','<оператор>', ';', '<посл. операторов>'],
        'begin'			: ['\n    ','<оператор>', ';', '<посл. операторов>'],
        'end'			: ['#']
    },
    '<else>': {
        'else'			: ['\n    else\n    ', '<оператор>'],
        ';'				: ['#']
    },
    '<оператор>': {
        'identifier'	: [Translator.key['identifier'] ,' = ' , '<выражение>'],
        'if'			: ['if (', '<условие>', ')\n    ', '<оператор>', ';', '<else>'],
        'while'			: ['while (', '<условие>', ')\n    ', '<оператор>'],
        'for'			: ['for (', Translator.key['identifier'], '=', '<числ. выражение>', ';', Translator.key['identifier'], '<','<числ. выражение>', ';', Translator.key['identifier'], '++)\n    ', '<оператор>'],
        'write'			: ['cout <<', '<выражение>'],
        'read'			: ['cin >>', Translator.key['identifier']],
        'begin'			: ['{', '<посл. операторов>', '\n    }'],
        'end'			: ['#']
    },
    '<условие>': {
        'identifier'	: ['<сравнение>', '<усл.>'],
        'const_str'		: ['<сравнение>', '<усл.>'],
        'const_num'		: ['<сравнение>', '<усл.>'],
        '('				: ['<сравнение>', '<усл.>']
    },
    '<отнош.>': {
        '='				: ['==' , '<выражение>'],
        '<>'			: ['!=' , '<выражение>'],
        '<'				: [' < ' , '<выражение>'],
        '>'				: [' > ' , '<выражение>'],
        '<='			: ['<=' , '<выражение>'],
        '>='			: ['>=' , '<выражение>']
    },
    '<усл.>': {
        'and'			: ['<лог. оператор>', '<условие>'],
        'or'			: ['<лог. оператор>', '<условие>'],
        'then'			: ['#'],
        ')'				: ['#'],
        'do'			: ['#']
    },
    '<сравнение>': {
        'identifier'	: ['<выражение>','<отнош.>'],
        'const_str'		: ['<выражение>','<отнош.>'],
        'const_num'		: ['<выражение>','<отнош.>'],
        '('				: ['<выражение>','<отнош.>']
    },
    '<лог. оператор>': {
        'then'			: ['#'],
        'do'			: ['#'],
        'and'			: [' && '],
        'or'			: [' || ']
    },
    '<выражение>': {
        'identifier'	: ['<числ. выражение>'],
        'const_str'		: ['<стр. выражение>'],
        'const_num'		: ['<числ. выражение>'],
        '('				: ['<числ. выражение>']
    },
    '<числ. выражение>': {
        'identifier'	: ['<терм>', '<action>'],
        'const_num'		: ['<терм>', '<action>'],
        '('				: ['<терм>', '<action>']
    },
    '<action>': {
        'then'			: ['#'],
        'do'			: ['#'],
        '+'				: ['+', '<числ. выражение>'],
        '-'				: ['-', '<числ. выражение>'],
        '/'				: ['/', '<числ. выражение>'],
        '*'				: ['*', '<числ. выражение>'],
        ')'				: ['#'],
        ';'				: ['#'],
        '='				: ['#'],
        'and'			: ['#'],
        'or'			: ['#'],
        'to'			: ['#'],
        '>'				: ['#'],
        '<'				: ['#'],
        '<>'			: ['#'],
        '<='			: ['#'],
        '>='			: ['#']
    },
    '<терм>': {
        '('				: ['(', '<числ. выражение>', ')'],
        'identifier'	: [Translator.key['identifier']],
        'const_num'		: [Translator.key['const_num']]
    },
    '<стр. выражение>': {
        'identifier'	: ['<стр. терм>', '<straction>'],
        'const_str'		: ['<стр. терм>', '<straction>']
    },
    '<straction>': {
        '+'				: ['+', '<стр. выражение>'],
        'then'			: ['#'],
        'do'			: ['#'],
        ';'				: ['#'],
        '='				: ['#'],
        '<>'			: ['#'],
        '<'				: ['#'],
        '>'				: ['#'],
        '<='			: ['#'],
        '>='			: ['#'],
        'and'			: ['#'],
        'or'			: ['#'],
        ')'				: ['#']
    },
    '<стр. терм>': {
        'identifier'	: [Translator.key['identifier']],
        'const_str'		: ['\'',Translator.key['const_str'],'\'']
    }
};