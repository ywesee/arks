from restapi import api, APIError
from .models import *

@api
def create_player(player_name, game_secret, gameName, inviter):

    player = Player.objects.filter(name=player_name, game_secret=game_secret, game_name=gameName, inviter_name=inviter).first()
    if not player:
        player = Player.objects.create(name=player_name, game_secret=game_secret, game_name=gameName, inviter_name=inviter)

    return {'code': 0, 'msg': '创建玩家成功'}

@api
def create_game(inviter, gameName, game_id):
    player = Player.objects.filter(name=inviter, game_secret=game_id, game_name=gameName, inviter_name=inviter).first()
    if not player:
        player = Player.objects.create(name=inviter, game_secret=game_id, game_name=gameName, inviter_name=inviter)

    game = Game.objects.create(game_secret=game_id, game_name=gameName, inviter=player)


    character_one = Character.objects.filter(name='Carefulness').first()
    character_two = Character.objects.filter(name='Power').first()

    CharacterChoose.objects.create(
        character_one=character_one, character_two=character_two,
        player=player, game=game
    )


    return {'code': 0}


@api
def get_game_list(**params):

    games = Game.objects.filter(status=0)

    game_list = []
    for game in games:
        game_list.append([game.game_secret, game.game_name, game.inviter.name])

    return {'code': 0, 'gameList':game_list}


@api
def find_players(game_secret, gameName):
    players = Player.objects.filter(game_secret=game_secret, game_name=gameName)
    player_list = [ p.name for p in players]

    return {'code': 0, 'player_list': player_list}

@api
def get_player_list(game_secret, gameName, inviter):
    players = Player.objects.filter(game_secret=game_secret, game_name=gameName, inviter_name=inviter)
    player_list = [ p.name for p in players ]

    return {'code': 0, 'player_list': player_list}


@api
def get_character():

    characters = [ _.name for _ in Character.objects.all()]

    return {'code': 0, 'characters': characters}

@api
def set_player_score(
    params, inviter_name, gameSecret, player, gameName,
    charaChooser, characterOne, characterTwo):

    # print(params, inviter_name, gameSecret, player, gameName, charaChooser, characterOne, characterTwo, sep='\n')

    inviter = Player.objects.filter(
        name=inviter_name,
        inviter_name=inviter_name,
        game_name=gameName,
        game_secret=gameSecret
    ).first()

    scorer = Player.objects.filter(
        name=player,
        inviter_name=inviter_name,
        game_name=gameName,
        game_secret=gameSecret
    ).first()

    charaChooser2 = Player.objects.filter(
        name=charaChooser,
        inviter_name=inviter_name,
        game_name=gameName,
        game_secret=gameSecret
    ).first()

    game = Game.objects.filter(
        game_secret=gameSecret,
        inviter=inviter,
        game_name=gameName,
        status=0
    ).first()

    character_one = Character.objects.filter(name=characterOne).first()
    character_two = Character.objects.filter(name=characterTwo).first()


    characterChoose = CharacterChoose.objects.filter(
        character_one = character_one,
        character_two = character_two,
        player=charaChooser2,
        game=game
    ).first()

    for k, v in params.items():
        _player = Player.objects.filter(
            name=k, game_secret=gameSecret, game_name=gameName, inviter_name=inviter_name
        ).first()

        PlayerScore.objects.create(
            character_choose=characterChoose,
            score=v,
            scorer=scorer,
            player=_player,
            game=game
        )

    return {'code':0, 'msg':'打分成功'}

@api
def save_character_choose(inviterName, gameSecret, playerName, gameName, charaChooser):

    character_one = Character.objects.filter(name=charaChooser[0]).first()
    character_two = Character.objects.filter(name=charaChooser[1]).first()

    player = Player.objects.filter(
        name=playerName, game_secret=gameSecret,
        inviter_name=inviter_name, game_name=gameName
    ).first()

    inviter = Player.objects.filter(
        name=inviterName, inviter_name=inviterName,
        game_name=gameName, game_secret=gameSecret
    ).first()

    game = Game.objects.filter(
        game_secret=gameSecret, inviter=inviter,
        game_name=gameName, status=0
    ).first()

    CharacterChoose.objects.create(
        character_one=character_one, character_two=character_two,
        player=player, game=game
    )

    return {'code:':0}

@api
def get_player_score(inviter, gameName, gameSecret, player, character_one, character_two, chooser):



    _player = Player.objects.filter(
        name=player, game_secret=gameSecret,
        inviter_name=inviter, game_name=gameName
    ).first()
    _inviter = Player.objects.filter(
        name=inviter, game_secret=gameSecret,
        inviter_name=inviter, game_name=gameName
    ).first()

    chooser = Player.objects.filter(
        name=chooser, game_secret=gameSecret,
        inviter_name=inviter, game_name=gameName
    ).first()

    game = Game.objects.filter(
        game_secret=gameSecret,
        inviter=_inviter,
        game_name=gameName,
        status=0
    ).first()


    character_one = Character.objects.filter(name=character_one).first()
    character_two = Character.objects.filter(name=character_two).first()
    characterChoose = CharacterChoose.objects.filter(
        character_one=character_one, character_two=character_two,
        player=chooser, game=game
    ).first()

    player_scores = PlayerScore.objects.filter(game=game, player=_player, character_choose=characterChoose)

    player_list = []
    player_score_list = []


    for _ in player_scores:
        player_list.append(_.scorer.name)
        player_score_list.append(int(_.score))

    middle = int(sum(list(map(int, player_score_list))) / len(player_score_list))

    # player_list.append(player)
    # player_score_list.append(middle)

    return {'code':0, 'player_score_list':player_score_list, 'player_list': player_list, 'middle': middle}











