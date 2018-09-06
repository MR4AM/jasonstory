const gamedata=[
    {
      "role":"pingmin",
      "dec": "本身没有任何能力，一觉睡到天亮却要考虑很多事情。平民会接收到真假混杂的信息，需要从中分辨和判断出正确的信息.",
      "src": "../../images/wolfkill/pingmin.jpg"
    },
    {
      "role": "langren",
      "dec": "每天晚上会残忍地杀害一个村民，到了白天，狼人要假扮村民隐藏自己的身份，故意误导或陷害其他村民.",
      "src": "../../images/wolfkill/langren.jpg"
    },
    {
      "role": "yuyanjia",
      "dec": "每晚预言家可以窥视一个玩家的真实身份，是村庄里的灵魂人物。预言家要思考如何帮助村民的同时又不被狼人发现自己的身份。",
      "src": "../../images/wolfkill/yuyanjia.jpg"
    },
    {
      "role": "nvwu",
      "dec": "女巫拥有两瓶药，解药可以救活一名当晚被狼人杀害的玩家，毒药可以毒杀一名玩家，女巫在每天晚上最多使用一瓶药，女巫不可自救。",
      "src": "../../images/wolfkill/nvwu.jpg"
    },
    {"role":"lieren",
      "dec": "当猎人被狼人杀害或被村民处决时，他可以射杀任意一个玩家。但当猎人由于意外死亡（如女巫的毒药或者被殉情而死）他不可在死前射出子弹。",
      "src": "../../images/wolfkill/lieren.jpg"
    },
    {"role":"qiubite",
      "dec": "第一个晚上，选择两名玩家成为情侣。丘比特可以选择自己成为情侣之一，如果情侣里有一个人不幸落难，另一个则会为之殉情。如果情侣之中两人分别属于不同阵营，则他们的游戏目标就会改变成这对情侣只想平静地生活下去，所以他们必须除掉所有其他的玩家。（注：部分局规定情侣死亡则丘比特回归神阵营，部分局则规定不回归神阵营）",
      "src": "../../images/wolfkill/qiubite.jpg"
    },
    {"role":"daozei",
      "dec": "上帝从所有身份牌中随机抽取两张，并将其他身份牌正常发放。第一晚盗贼最先睁眼，上帝向他展示这两张身份牌，盗贼从中选择一张作为自己的身份，另一张则作废。若两张身份牌中存在狼人，则盗贼必须选择狼人。",
      "src": "../../images/wolfkill/daozei.jpg"
    },
    {"role":"shouwei",
      "dec": "每晚守卫暗中指定一个玩家，该玩家当晚会受到保护，不会被狼人杀害，守卫不能连续两晚守卫同一个人，守卫可以守卫自己。（注：部分局规定若女巫的救人与守卫守护的人为同一人，则判定该位玩家因同守同救而死亡）",
      "src": "../../images/wolfkill/shouwei.jpg"
    },
    {"role":"baichi",
      "dec": "白痴若是被投票出局，可以翻开自己的身份牌，免疫此次放逐，之后可以正常发言，但不能投票，狼人仍需要击杀他一次才能让他死亡。但若是白痴因非投票原因死亡，则无法发动技能，立即死亡。",
      "src": "../../images/wolfkill/baichi.jpg"
    },
    {"role":"bailangwang",
      "dec": "属于狼人阵营，白狼王可以在白天自爆的时候，选择带走一名玩家，非自爆出局不得发动技能。",
      "src": "../../images/wolfkill/bailangwang.jpg"
    },
    {"role":"yehaizi",
      "dec": "野孩子从小被狼养大，在被好心的村里人收养后野性也渐渐平息。第一天晚上，野孩子醒来并选择一个榜样，之后的游戏中当榜样以任何形式死亡时，野孩子因为榜样的死亡而丧失人性，成为一个狼人。从这时开始野孩子成为狼人阵营，每天晚上和狼人一起行动，胜利目标也和狼人相同。",
      "src": "../../images/wolfkill/yehaizi.jpg"
    },
    {"role":"xunxiongshi",
      "dec": "每天晚上有咆哮（验人）功能，可以查验身边两名玩家。如果有狼人，熊便会咆哮，白天法官会提示熊是否有咆哮。",
      "src": "../../images/wolfkill/xunxiongshi.jpg"
    },
    {"role":"qishi",
      "dec": "骑士深知圣光之道，以圣洁的心灵而闻名，不接受任何污蔑和诋毁。骑士可以在白天投票前翻开自己的身份牌并指定一个玩家，若是狼人，则此玩家立刻死亡，然后直接进入黑夜，若不是，则骑士以死谢罪，投票继续。这个技能只能发动一次。",
      "src": "../../images/wolfkill/qishi.jpg"
    },
    {"role":"langwang",
      "dec": "属于狼人阵营，具有死后开枪技能。（殉情和被毒杀不能开枪）",
      "src": "../../images/wolfkill/langwang.jpg"
    },
    {"role":"zhadanren",
      "dec": "白天被投票放逐后，所有给他上票的玩家全部死亡，其他方式死亡无法发动技能如炸弹人被放逐时炸死场上所有人，则炸弹人单独获得胜利。",
      "src": "../../images/wolfkill/zhadanren.jpg"
    },
    {"role":"langmeiren",
      "dec": "狼美人是狼人阵营，在夜里可以魅惑一人，天亮后，如果狼美人被放逐出局或者被猎人射杀，被魅惑的玩家跟随狼美人一起出局，且无技能。（被魅惑的玩家不知情）",
      "src": "../../images/wolfkill/langmeiren.jpg"
    },
    {"role":"laoliumang",
      "dec": "老流氓是平民牌，不被魅惑。在被撒毒或者射杀后分别进入中毒和负伤状态，当天不会死亡，在第二天发言结束后死亡。",
      "src": "../../images/wolfkill/laoliumang.jpg"
    },
    {"role":"jinyanzhanglao",
      "dec": "每天晚上可以指定一名玩家，第二天早上该玩家不能说话（但仍可以用动作表达想法），不能连续两晚禁言同一人。",
      "src": "../../images/wolfkill/jinyanzhanglao.jpg"
    },

    {"role":"yinlang",
      "dec": "和狼人共享胜利条件，但是没有狼刀，即夜晚不与狼人同时睁眼，狼人死完隐狼自动出局。隐狼被预言家，驯熊师验出来的身份都是好人。",
      "src": "../../images/wolfkill/yinlang.jpg"
    },
    {"role":"jingzhang",
      "dec": "附加身份牌，游戏开始后第一天从所有玩家中通过投票选举出一名玩家授予警长。警长在白天最后发言并且投票时有1.5 票。",
      "src": "../../images/wolfkill/jingzhang.jpg"
    }
];
module.exports={
  gamedata,
}