# Generated by Django 2.1.3 on 2019-02-21 10:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Character',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='性格')),
            ],
            options={
                'verbose_name': '性格表',
                'verbose_name_plural': '性格表',
            },
        ),
        migrations.CreateModel(
            name='CharacterChoose',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('character_one', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='character_one', to='arkserver.Character', verbose_name='性格一')),
                ('character_two', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='character_two', to='arkserver.Character', verbose_name='性格二')),
            ],
            options={
                'verbose_name': '性格选择表',
                'verbose_name_plural': '性格选择表',
            },
        ),
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('game_secret', models.CharField(blank=True, max_length=200, null=True, verbose_name='游戏房间密码')),
                ('game_name', models.CharField(max_length=200, verbose_name='游戏名称')),
                ('status', models.IntegerField(choices=[(0, '正常'), (1, '已结束')], default=0, verbose_name='游戏状态')),
            ],
            options={
                'verbose_name': '游戏表',
                'verbose_name_plural': '游戏表',
            },
        ),
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='玩家名')),
                ('game_secret', models.CharField(blank=True, max_length=200, null=True, verbose_name='游戏房间密码')),
                ('game_name', models.CharField(max_length=200, verbose_name='游戏名称')),
                ('inviter_name', models.CharField(max_length=200, verbose_name='邀请人名称')),
            ],
            options={
                'verbose_name': '玩家表',
                'verbose_name_plural': '玩家表',
            },
        ),
        migrations.CreateModel(
            name='PlayerScore',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.CharField(max_length=100, verbose_name='分数')),
                ('character_choose', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='arkserver.CharacterChoose')),
                ('game', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='arkserver.Game', verbose_name='游戏')),
                ('player', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='player_score', to='arkserver.Player', verbose_name='被打分人')),
                ('scorer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='scorer_score', to='arkserver.Player', verbose_name='打分人')),
            ],
            options={
                'verbose_name': '玩家打分表',
                'verbose_name_plural': '玩家打分表',
            },
        ),
        migrations.AddField(
            model_name='game',
            name='inviter',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='inviter_game', to='arkserver.Player', verbose_name='游戏发起人'),
        ),
        migrations.AddField(
            model_name='characterchoose',
            name='game',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='arkserver.Game', verbose_name='游戏'),
        ),
        migrations.AddField(
            model_name='characterchoose',
            name='player',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='arkserver.Player', verbose_name='选择人'),
        ),
    ]
