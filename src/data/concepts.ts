import type { Concept } from '@/types'

export const concepts: Concept[] = [
  {
    id: 'dasein',
    name: '此在',
    pinyin: 'cǐ zài',
    shortDefinition: 'Dasein，指人的存在，特指那种能够追问自身存在意义的存在者。',
    detailedExplanation: `此在（Dasein）是海德格尔《存在与时间》中的核心概念。字面意为"此-在"（Da-sein），指人的存在方式。此在不同于其他存在者的根本之处在于：此在的存在对其自身而言是"成问题"的——此在能够追问自身存在的意义。

此在具有三个基本存在论结构：
1. **现身情态（Befindlichkeit）**——此在总是已经在某种情绪中被给予自身
2. **领会（Verstehen）**——此在总是对可能性有所筹划
3. **话语（Rede）**——此在通过语言展开世界

海德格尔强调，此在的存在方式不是现成的"主体"或"意识"，而是在世界之中存在（In-der-Welt-sein）。`,
    field: '存在论',
    relatedConcepts: ['sein', 'in-der-welt-sein', 'sorge'],
    source: '海德格尔《存在与时间》导论 §2-§4',
  },
  {
    id: 'sein',
    name: '存在',
    pinyin: 'cún zài',
    shortDefinition: 'Sein，一切存在者之所以为存在者的根据，是哲学最根本的研究对象。',
    detailedExplanation: `存在（Sein）是西方哲学最核心的概念。在海德格尔之前，从柏拉图到黑格尔，存在一直被理解为"最普遍的共相"或"最高的神"。

海德格尔重新提出了"存在之问"：为什么存在者在而"无"倒不在？他认为，全部西方形而上学史都犯了一个根本错误——把存在（Sein）与存在者（Seiendes）混淆了（存在论差异）。

存在不是某种"东西"，而是使得一切存在者得以显现的"意义场域"。存在本身"隐而不显"，但通过此在（Dasein）对存在的领会得以展开。`,
    field: '存在论',
    relatedConcepts: ['dasein', 'seiendes'],
    source: '海德格尔《存在与时间》导论 §1',
  },
  {
    id: 'seiendes',
    name: '存在者',
    pinyin: 'cún zài zhě',
    shortDefinition: 'Seiendes，一切"是"的东西——包括物、人、观念等所有被当作"某物"来谈论的东西。',
    detailedExplanation: `存在者（Seiendes）泛指一切存在着的"东西"：桌子、树木、数字、艺术作品、上帝等。在传统形而上学中，存在者被分为不同的"区域存在论"领域。

海德格尔最重要的区分就是"存在论差异"（ontologische Differenz）——存在（Sein）不是存在者（Seiendes），二者不可混淆。全部形而上学史就是一部"遗忘存在"的历史：人们总是把存在当作某种最高的存在者（如神、理念、主体）来思考。

此在是一种特殊的存在者——它不只是一个现成的东西，而是通过"去存在"（Zu-sein）的方式"成其本质"。`,
    field: '存在论',
    relatedConcepts: ['sein', 'dasein'],
    source: '海德格尔《存在与时间》导论 §1-§2',
  },
  {
    id: 'in-der-welt-sein',
    name: '在世之在',
    pinyin: 'zài shì zhī zài',
    shortDefinition: 'In-der-Welt-sein，此在的基本存在状态——此在不是先有一个孤立的主体，然后再进入一个现成的世界。',
    detailedExplanation: `在世之在（In-der-Welt-sein）是此在的存在建构，强调此在与世界不是两个现成的东西之间的"外在关系"，而是此在"总是已经"在世界之中。

海德格尔用连字符（In-der-Welt-sein）来表明这是一个统一的现象。这一概念打破了两千多年来的主客二元框架——主体不是"在世界之外"的旁观者，而是"在世界之中"的参与者。

世界的含义也不是物理学意义上的宇宙，而是此在的"意蕴整体"：用具关联、因缘整体、定向与空间化。此在的世界是"周围世界"（Umwelt）。`,
    field: '存在论',
    relatedConcepts: ['dasein', 'verfallen', 'sorge'],
    source: '海德格尔《存在与时间》第一篇 §12-§13',
  },
  {
    id: 'verfallen',
    name: '沉沦',
    pinyin: 'chén lún',
    shortDefinition: 'Verfallen，此在日常状态下的存在方式——被"常人"所支配，迷失在公众意见和日常事务中。',
    detailedExplanation: `沉沦（Verfallen）描述的是此在的日常存在方式。它不是道德意义上的"堕落"，而是存在论意义上的——此在总是倾向于从它所操劳的"世界"方面来理解自身。

沉沦有三个特征：
1. **闲言（Gerede）**——人云亦云，不追问本真的理解
2. **好奇（Neugier）**——流于表象，只为"看"而看
3. **两可（Zweideutigkeit）**——一切都不确定，但一切又似乎都被理解了

在沉沦中，此在被"常人"（das Man）所支配——"常人"不是某个具体的人，而是无人称的公众意见。此在由此陷入了"非本真状态"。`,
    field: '存在论',
    relatedConcepts: ['dasein', 'eigentlichkeit', 'uneigentlichkeit'],
    source: '海德格尔《存在与时间》第一篇 §35-§38',
  },
  {
    id: 'angst',
    name: '畏',
    pinyin: 'wèi',
    shortDefinition: 'Angst，一种基本现身情态，不同于"怕"（Furcht），畏的对象不是某个具体的东西，而是"在世本身"。',
    detailedExplanation: `畏（Angst）是海德格尔哲学中最关键的情绪概念。畏不同于"怕"（Furcht）——怕总是怕某个具体的、有害的东西；而畏的对象却"不确定"，它不是这个或那个东西，而是"世界之为世界本身"。

在畏中：
- 世内存在者"沉陷"了，不再有意义
- 此在面对"无"（Nichts）——即存在者的整体丧失意义
- 此在个体化——被从"常人"中拉回自身
- 此在直面最本己的存在——"向死而在"

畏是一种"例外"的现身情态，它打破了日常的沉沦状态，让此在得以瞥见自己的本真存在可能性。`,
    field: '存在论',
    relatedConcepts: ['dasein', 'sein-zum-tode', 'eigentlichkeit'],
    source: '海德格尔《存在与时间》第一篇 §40',
  },
  {
    id: 'sein-zum-tode',
    name: '向死而生',
    pinyin: 'xiàng sǐ ér shēng',
    shortDefinition: 'Sein-zum-Tode，此在的存在方式从根本上就是"朝向死亡的存在"——死亡是此在最本己的、无所关联的、不可逾越的可能性。',
    detailedExplanation: `向死而生（Sein-zum-Tode）是海德格尔对此在与死亡关系的存在论分析。死亡不是"将来某个时刻发生的事件"，而是此在一"存在"就"已经"在"向死而在"的方式中存在。

死亡的三重特征：
1. **最本己的**——死亡是此在谁也无法替代的"我的死"
2. **无所关联的**——死亡切断了此在与"常人"及其他存在者的一切关联
3. **不可逾越的**——死亡是此在的终结，是一切可能性的"不可能性"

直面"向死而在"，此在才能从"常人"的日常逃避中挣脱，获得一种整体性的、本真的生存领会。这正是"向死而生"的积极意义。`,
    field: '存在论',
    relatedConcepts: ['dasein', 'angst', 'eigentlichkeit', 'sorge'],
    source: '海德格尔《存在与时间》第二篇 §46-§53',
  },
  {
    id: 'eigentlichkeit',
    name: '本真状态',
    pinyin: 'běn zhēn zhuàng tài',
    shortDefinition: 'Eigentlichkeit，此在从"常人"中收回自身，决意地面对自身最本己的能在的存在方式。',
    detailedExplanation: `本真状态（Eigentlichkeit）是此在的存在可能性之一。字面义是"成为自己的"（eigen）。本真状态不是一种"更高的道德境界"，而是此在的一种存在论样式。

此在进入本真状态的途径：
1. **畏的现身**——打破日常的沉沦
2. **面向死亡的先行**——获得整体性的生存领会
3. **良知的呼唤**——"此在自身"从"常人"那里唤回自己
4. **决断（Entschlossenheit）**——打开实际的可能性，在世界中行动

本真状态并不意味着隐居或遁世，而是以"有良知的方式"在世存在——以新的方式投入世界和与他人的共在中。`,
    field: '存在论',
    relatedConcepts: ['dasein', 'uneigentlichkeit', 'angst', 'sein-zum-tode', 'gewissen'],
    source: '海德格尔《存在与时间》第二篇 §54-§60',
  },
  {
    id: 'uneigentlichkeit',
    name: '非本真状态',
    pinyin: 'fēi běn zhēn zhuàng tài',
    shortDefinition: 'Uneigentlichkeit，此在在"常人"支配下的日常存在方式——从世界和他人那里理解自身，而非从自身出发。',
    detailedExplanation: `非本真状态（Uneigentlichkeit）与此在的"沉沦"结构对应。非本真不等于"不真实"或"虚假"——它是此在最日常、最切近的存在方式。非本真意味着：

- 此在从所操劳的"世界"方面理解自己（"我是我的工作""我是我的社会角色"）
- 此在听从"常人"的公众意见和解释方式
- 此在逃避死亡这一最本己的可能性

有意思的是，海德格尔并不认为非本真状态是"坏的"。它是此在生存的常态，是非本真状态构成了此在"首先与通常"的存在方式。然而，"常人的统治"使此在失去了自身的决断力。`,
    field: '存在论',
    relatedConcepts: ['dasein', 'eigentlichkeit', 'verfallen'],
    source: '海德格尔《存在与时间》第一篇 §25-§27',
  },
  {
    id: 'sorge',
    name: '烦',
    pinyin: 'fán',
    shortDefinition: 'Sorge，此在存在的整体性结构——此在的存在就是"先行于自身已经在（世界之中）存在而寓于（世内存在者）的存在"。',
    detailedExplanation: `烦（Sorge）是海德格尔用来描述此在存在整体性的概念。它不是一个心理学概念（不是"焦虑"或"烦恼"），而是一个存在论的结构性概念。

烦的三重结构（对应时间性的三维）：
1. **先行于自身**（未来）——此在总是指向可能性，"去存在"
2. **已经在世界之中**（曾在）——此在总是"被抛"进一个既定的世界
3. **寓于世内存在者**（当前）——此在总是要操劳世内的事物

"烦"统一了此在存在的三个维度。海德格尔由此证明，此在存在的"意义"就是——**时间性**（Zeitlichkeit）。`,
    field: '存在论',
    relatedConcepts: ['dasein', 'zeitlichkeit', 'sein-zum-tode'],
    source: '海德格尔《存在与时间》第一篇 §39-§41',
  },
  {
    id: 'phaenomenologie',
    name: '现象学',
    pinyin: 'xiàn xiàng xué',
    shortDefinition: 'Phänomenologie，"让那显现自身者以自身显现的方式被看见"，海德格尔的方法论基础。',
    detailedExplanation: `现象学（Phänomenologie）是《存在与时间》的方法论基础。海德格尔对"现象学"做了词源学还原：

- **现象（Phänomen）**——来自希腊语 φαινόμενον，即"显现自身者"
- **逻各斯（Logos）**—— λόγος，即"让人看见"

因此，现象学就是：**让那显现自身者以自身显现的方式从自身那里被看见**。

海德格尔的现象学方法论关键是：现象学不研究"表面现象"，而是要揭示那"首先与通常不显现的东西"——即存在（Sein）。存在本身不是现成的，它需要通过对此在的"存在论分析"才得以显露。

这导致了"诠释学现象学"——对存在的理解总是通过此在的解释来实现的。`,
    field: '方法论',
    relatedConcepts: ['dasein', 'sein', 'hermeneutischer-zirkel'],
    source: '海德格尔《存在与时间》导论 §7',
  },
  {
    id: 'hermeneutischer-zirkel',
    name: '诠释学循环',
    pinyin: 'quán shì xué xún huán',
    shortDefinition: 'Hermeneutischer Zirkel，理解和解释的结构性循环——整体只能通过部分来理解，而部分又只能在整体中获得其意义。',
    detailedExplanation: `诠释学循环（Hermeneutischer Zirkel）是哲学诠释学中的核心方法论概念。它不是一种"逻辑上的缺陷"，而是理解的"存在论结构"。

在海德格尔看来：
- 此在的任何理解都已经预设了对"整体"的前理解
- 任何解释都是从"前结构"（Vor-Struktur）出发的：前有、前见、前把握
- 理解的循环不是恶性的——关键在于以正确的方式进入这个循环

"决定性的不是走出循环，而是以正确的方式进入循环。"
——海德格尔《存在与时间》§32

这意味着：我们不可能从"无预设"开始理解。学术研究的任务不是消除前见，而是让前见在"面向事情本身"的过程中不断被修正和完善。`,
    field: '方法论',
    relatedConcepts: ['phaenomenologie', 'dasein'],
    source: '海德格尔《存在与时间》§32-§33',
  },
  {
    id: 'zeitlichkeit',
    name: '时间性',
    pinyin: 'shí jiān xìng',
    shortDefinition: 'Zeitlichkeit，此在存在的存在论意义。不是流俗理解的"时间"，而是"绽出的"时间性。',
    detailedExplanation: `时间性（Zeitlichkeit）是《存在与时间》的核心发现——此在存在的"意义"就是时间性。它不是日常理解的钟表时间或物理时间，而是此在生存的"绽出"（Ekstase）时间。

时间性的三维绽出：
1. **将来**——先行于自身（向死而在）
2. **曾在**——已经存在（被抛状态）
3. **当前**——寓于存在者（沉沦）

这三个维度不是三个不同的"时间点"，而是时间性本身的三个"绽出"，它们同时"到时"（zeitigen）。因此，此在的时间性是"有终的"——以死亡为终点——而非无限的线性时间。

海德格尔通过将存在论奠基于时间性，完成了对传统形而上学"永恒在场"时间观的颠覆。`,
    field: '存在论',
    relatedConcepts: ['dasein', 'sorge', 'sein-zum-tode', 'ekstase'],
    source: '海德格尔《存在与时间》第二篇 §65',
  },
  {
    id: 'ekstase',
    name: '绽出',
    pinyin: 'zhàn chū',
    shortDefinition: 'Ekstase，时间性的基本特征——此在"站出去"到不同的时间维度中，而不是被封闭在一个"点状的现在"中。',
    detailedExplanation: `绽出（Ekstase）是时间性（Zeitlichkeit）的运作方式。希腊语 ἐκστατικόν 意为"站出去"。时间性的三个绽出（将来、曾在、当前）不是三个孤立的时间点，而是此在"出离自身"到三种不同的可能性维度中。

此在不是"占有"一个内在的意识流时间，此在本身就是绽出的——它总是已经在"超出自身"的地平线上生存。

这一概念对传统"内在意识时间"（奥古斯丁、康德、胡塞尔）构成根本挑战：时间不是意识内部的形式，而是此在出离自身的存在方式。正是此在的绽出性使得此在能够"开敞"一个世界。

**存在"是"时间，不是因为它有一个时间尺度，而是因为它作为绽出的时间性而到时。**`,
    field: '存在论',
    relatedConcepts: ['zeitlichkeit', 'dasein'],
    source: '海德格尔《存在与时间》§65-§66',
  },
  {
    id: 'gewissen',
    name: '良知',
    pinyin: 'liáng zhī',
    shortDefinition: 'Gewissen，此在从沉沦中被唤回自身的"呼唤"——它不是道德法则的声音，而是此在自身的呼声。',
    detailedExplanation: `良知（Gewissen）在此不是道德哲学的"良心的声音"或康德的"道德律令"。海德格尔把良知作为一个存在论现象来分析。

在"常人"的日常状态中，此在"听闻"的是常人的公众意见。但此在自身（作为向死而在的存在者）会发出一种"呼唤"（Ruf）：

- 呼唤者：此在自身（在其最本己的、无家可归的畏中）
- 被呼唤者：此在（作为常人的此在）
- 呼唤内容：无（不说任何具体的东西，只是唤回此在自身）

良知呼唤不提供任何具体的行为指令，它只做一件事——**让此在从常人中回到自身，承认自己的"罪责"（Schuld）——即此在存在的基础是"无"（Nichts）。**`,
    field: '存在论',
    relatedConcepts: ['dasein', 'eigentlichkeit', 'verfallen', 'angst'],
    source: '海德格尔《存在与时间》第二篇 §54-§60',
  },
  {
    id: 'vorhandenheit',
    name: '现成在手',
    pinyin: 'xiàn chéng zài shǒu',
    shortDefinition: 'Vorhandenheit，事物作为"现成的"对象被观察和认识的存在方式。与"当下上手"相对。',
    detailedExplanation: `现成在手（Vorhandenheit）和"当下上手"（Zuhandenheit）是海德格尔关于"物"的两种存在方式的区分。

**现成在手**指事物作为"对象"被认识的模式——当我们抛开一切实践用途，仅仅"凝视"或"观察"一个东西时，它就变成了"现成之物"。这是传统认识论中主体对客体的认知模式。

例如：当我们不再使用锤子钉钉子，而是把它当作一个"重物"来分析它的物理属性时，锤子就从"当下上手"变成了"现成在手"。

在海德格尔看来，现成在手是**派生的**存在方式——它源于我们中断了对事物的日常使用，转而采取旁观者的理论态度。传统形而上学正是建立在这种"理论态度"的基础之上。`,
    field: '存在论',
    relatedConcepts: ['dasein', 'in-der-welt-sein'],
    source: '海德格尔《存在与时间》§15-§16',
  },
  {
    id: 'zuhandenheit',
    name: '当下上手',
    pinyin: 'dāng xià shàng shǒu',
    shortDefinition: 'Zuhandenheit，事物在"使用"中呈现的存在方式——用具在使用中"抽身而去"，不再成为注意的对象。',
    detailedExplanation: `当下上手（Zuhandenheit）描述的是事物在实践使用中的存在方式。当我们在使用锤子钉钉子时，锤子不是作为一个"对象"被我们有意识地观察——它"消失"在了使用中，成为了我们身体的延伸。

**用具的存在方式是"因缘整体"（Bewandtnisganzheit）**：
- 锤子是为了"钉钉子"
- 钉钉子是为了"固定木板"
- 固定木板是为了"盖房子"
- 盖房子是为了"遮蔽此在"

只有当用具**损坏**或**缺失**时，它才从"当下上手"变成"现成在手"——这时我们才会注意到它作为一个"对象"的存在。

海德格尔用这一区分颠覆了传统哲学的认识论——我们对世界最原初的"通达"不是"看"，而是"用"。`,
    field: '存在论',
    relatedConcepts: ['dasein', 'vorhandenheit', 'in-der-welt-sein'],
    source: '海德格尔《存在与时间》§15-§16',
  },
]