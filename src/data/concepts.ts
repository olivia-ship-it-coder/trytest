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
  {
    id: 'lacan-inconscient',
    name: '无意识',
    pinyin: 'wú yì shí',
    shortDefinition: '拉康将无意识重新定义为"像语言一样结构"——无意识不是本能冲动的黑暗深渊，而是遵循修辞法则（隐喻和换喻）的话语结构。',
    detailedExplanation: `无意识（Inconscient）是拉康对弗洛伊德最根本的重读。如果说弗洛伊德发现了无意识，拉康则是用结构语言学重新阐释了它。

拉康的著名命题："无意识像语言一样结构"（L'inconscient est structuré comme un langage）。

这意味着：
1. **能指优先**——无意识不是"深层"内容，而是能指链的滑动和运作
2. **修辞法则**——无意识的运作机制=隐喻（压缩）和换喻（移置），对应弗洛伊德的"凝缩"和"移置"
3. **无意识是大他者的话语**——无意识不是私人的内在领域，而是主体之外的符号秩序
4. **无意识在缝隙中显现**——口误、笔误、玩笑、症状——这些是能指链断裂的瞬间

拉康由此拒绝了"无意识是本能冲动容器"的生物学解释，将精神分析彻底语言化。`,
    field: '精神分析',
    relatedConcepts: ['lacan-signifiant', 'lacan-sujet-divise', 'lacan-grand-autre', 'lacan-desir'],
    source: '拉康《文集》"功能与领域"（Fonction et champ de la parole et du langage）',
  },
  {
    id: 'lacan-stade-miroir',
    name: '镜像阶段',
    pinyin: 'jìng xiàng jiē duàn',
    shortDefinition: '婴儿在6-18个月时通过镜中影像首次形成统一的自我意象，这一认同构成了自我（moi）的雏形，但本质上是"误认"。',
    detailedExplanation: `镜像阶段（Stade du miroir）是拉康1936年提出的概念，是他整个理论的起点。

**核心机制**：
6-18个月的婴儿尚不能完全控制自己的身体（"破碎的身体"），但能在镜中认出自己的影像。婴儿对这一完整影像的"认同"构成了自我（moi）的原初形式。

**关键要点**：
1. **结构性误认**——镜中影像是"颠倒的"，且是外在的。婴儿认同的是一个"外在的、颠倒的"形象。自我从本质上就是一种"误认"（méconnaissance）
2. **想象性掌握**——婴儿在现实中无法控制自身，但在镜像中"想象性地"掌握了自身——自我是一种想象性的建构
3. **侵略性**——由于镜像既是"我"又是"他者"，自我从一开始就带有与他者的竞争关系

镜像阶段奠定了拉康"想象界"的基础。`,
    field: '精神分析',
    relatedConcepts: ['lacan-imaginaire', 'lacan-sujet-divise', 'lacan-petit-a'],
    source: '拉康《文集》"作为精神分析经验中自我功能构成要素的镜像阶段"',
  },
  {
    id: 'lacan-reel',
    name: '实在界',
    pinyin: 'shí zài jiè',
    shortDefinition: '三界（RSI）之一，无法被符号化、无法被语言触及的东西。实在不是"现实"，而是抵抗符号化的硬核。',
    detailedExplanation: `实在界（Réel）是拉康三界拓扑中最复杂的概念。它不是"客观现实"（那是象征界和想象界的产物），而是**无法被符号化的剩余**。

**核心特征**：
1. **不可能性**——实在就是"那不可能的东西"，不可能被语言捕捉，不可能被象征化
2. **抵抗符号化**——语言必然在实在面前失败，实在总是在符号化的过程"遗漏"下来的东西
3. **创伤性内核**——实在在创伤中显现。创伤不是"过去的事件"，而是从未被恰当地符号化的经验内核
4. **与享乐的关系**——实在就是享乐（jouissance）的场所，是身体中无法被语言驯服的过度

拉康晚期越来越强调实在界：三界拓扑中，实在不再是"外围"，而是所有符号化的核心剩余。`,
    field: '精神分析',
    relatedConcepts: ['lacan-symbolique', 'lacan-imaginaire', 'lacan-jouissance', 'lacan-petit-a'],
    source: '拉康 研讨班XX《再来》（Encore）',
  },
  {
    id: 'lacan-symbolique',
    name: '象征界',
    pinyin: 'xiàng zhēng jiè',
    shortDefinition: '三界之一，语言、法则、交换和契约的秩序。主体通过进入象征界（即"阉割"）才成为社会性存在。',
    detailedExplanation: `象征界（Symbolique）是拉康三界中的主导秩序。它是语言、文化法则、亲属关系、交换结构的世界。

**核心要点**：
1. **语言作为基本结构**——象征界就是语言和符号的秩序。主体通过"进入语言"而进入象征界
2. **大他者的场所**——象征界就是大他者（Grand Autre）的领域。大他者是象征秩序本身——语言法则、社会法则
3. **阉割与缺失**——进入象征界必须以"阉割"为代价——主体必须放弃"与母亲直接融合"的想象性完整，接受父名（Nom-du-Père）的法则
4. **能指的决断**——象征界中的一切都是由能指之间的差异关系决定的。没有肯定的术语，只有差异

拉康早期更关注想象界（镜像阶段），但1950年代后转向象征界——受列维-斯特劳斯结构人类学影响，他认为无意识的结构就是语言的结构。`,
    field: '精神分析',
    relatedConcepts: ['lacan-reel', 'lacan-imaginaire', 'lacan-grand-autre', 'lacan-nom-du-pere', 'lacan-signifiant'],
    source: '拉康 研讨班III《精神病》（Les psychoses）',
  },
  {
    id: 'lacan-imaginaire',
    name: '想象界',
    pinyin: 'xiǎng xiàng jiè',
    shortDefinition: '三界之一，意象、认同和二元关系的秩序。自我（moi）本质上是想象性的——是镜像认同的产物。',
    detailedExplanation: `想象界（Imaginaire）源于镜像阶段的自我形成机制。它是个体与其意象（包括身体意象、他人意象）之间关系构成的维度。

**核心特征**：
1. **二元性**——想象界本质上是二元关系——自我与镜像、自我与他人之间的对称、对等、既认同又竞争的关系
2. **完整性的幻觉**——想象界给予主体"完整自我"的假象。自我（moi）是对破碎身体的"想象性修复"，但这一修复本质上是误认
3. **侵略性的根源**——由于镜像中的他者既是我又不是我，想象界天然带有侵略性和竞争性（黑格尔主奴辩证法的回响）
4. **与象征界的关系**——想象界的二元关系必须通过象征界的"第三方"（大他者/父名）来打破。没有象征界的介入，主体困在想象界的捕捉中

在临床层面，精神病的主要特征是想象界与象征界的脱落——父名的失败。`,
    field: '精神分析',
    relatedConcepts: ['lacan-stade-miroir', 'lacan-reel', 'lacan-symbolique', 'lacan-petit-a'],
    source: '拉康《文集》"关于我的经历"',
  },
  {
    id: 'lacan-grand-autre',
    name: '大他者',
    pinyin: 'dà tā zhě',
    shortDefinition: '象征秩序的场所，语言法则的"主体"，是主体欲望的真正对象——"人的欲望是大他者的欲望"。',
    detailedExplanation: `大他者（Grand Autre, A）是拉康最核心的概念之一，与"小他者"（petit autre, a）严格区分。

**大他者（A）vs 小他者（a）**：
- 小他者（a）——镜像中的他人，想象界的他者（另一个自我）
- 大他者（A）——象征秩序的场所，语言法则本身，"根本的他异性"

**大他者的三重含义**：
1. **象征秩序本身**——语言系统、社会法则、亲属结构等先于主体存在的符号网络
2. **主体欲望的场所**——"人的欲望是大他者的欲望"：主体欲望着大他者所欲的东西，主体渴望被大他者承认
3. **无意识的场所**——无意识不是主体的私有物，而是"大他者的话语"——主体被大他者所说（而非"我说"）

拉康的名言：大他者**不存在**（il n'y a pas de Grand Autre）——象征秩序没有一个最终的"担保人"，大他者本身也是"缺失的"。`,
    field: '精神分析',
    relatedConcepts: ['lacan-symbolique', 'lacan-desir', 'lacan-signifiant'],
    source: '拉康 研讨班XI《精神分析的四个基本概念》',
  },
  {
    id: 'lacan-petit-a',
    name: '对象a',
    pinyin: 'duì xiàng a',
    shortDefinition: '欲望的原因（而非对象）——主体在进入语言时丧失的"原初客体"，构成欲望的永恒驱力。对象a不可获得。',
    detailedExplanation: `对象a（Objet petit a）——"a"代表法语的"autre"（他者），但拉康说对象a不是任何"对象"。它是**欲望的原因**（la cause du désir），而非欲望所朝向的目标。

**形成机制**：
1. 婴儿最初与母亲处于未分离的"想象性融合"状态
2. 主体进入语言/象征界时，这一原初融合状态必然"丧失"
3. 这一丧失留下了一个**剩余**——对象a

**关键特征**：
1. **不可获得性**——对象a不是"某物"，永远不会在现实中找到对应物
2. **欲望的永动机**——主体总是在各种"对象"中寻找对象a（如升职、爱情、金钱），但每次都"不是它"
3. **与享乐的关系**——对象a是"享乐的物质"，是无法被语言吸纳的身体享乐的剩余
4. **作为驱力的目标**——拉康的驱力概念：不是生物学本能，而是围绕对象a的"循环"

在任何下拉康用"<>"符号表示对象a：它在主体与大他者之间，既不是主体也不是大他者，而是二者之间的"缺口"。`,
    field: '精神分析',
    relatedConcepts: ['lacan-desir', 'lacan-reel', 'lacan-jouissance'],
    source: '拉康 研讨班XI《精神分析的四个基本概念》',
  },
  {
    id: 'lacan-desir',
    name: '欲望',
    pinyin: 'yù wàng',
    shortDefinition: '人的欲望不是指向某个具体对象的"需要"，而是指向大他者的——"人的欲望是大他者的欲望"。欲望在本质上是"成为（被）欲望"。',
    detailedExplanation: `欲望（Désir）是拉康精神分析最根本的概念之一。拉康区分了三个层次：

**需要（Besoin）→ 要求（Demande）→ 欲望（Désir）**：
- **需要**——生物性的需求（饥、渴等），有具体的满足对象
- **要求**——向大他者（首先是母亲）发出的"爱的要求"，本质上要求的是"承认"而非满足
- **欲望**——要求减去需要的"剩余"，是主体最根本的生存性位置

**欲望的核心命题**：
1. **"人的欲望是大他者的欲望"**——主体欲望的"是什么"是由大他者的欲望决定的（主体想知道：大他者欲望着什么？）
2. **欲望即换喻**——欲望永远在"滑移"，它从一个能指滑向另一个能指，永远不能被"满足"
3. **欲望 vs 驱力**——驱力（pulsion）是欲望在对象a周围的"循环"，欲望是"一"，驱力是"多"

分析的目标不是"实现欲望"，而是让主体在其**欲望中坚持**（ne pas céder sur son désir）。`,
    field: '精神分析',
    relatedConcepts: ['lacan-grand-autre', 'lacan-petit-a', 'lacan-sujet-divise', 'lacan-inconscient'],
    source: '拉康《文集》"主体的颠覆与欲望的辩证法"',
  },
  {
    id: 'lacan-jouissance',
    name: '享乐',
    pinyin: 'xiǎng lè',
    shortDefinition: 'Jouissance，超越"快乐原则"（pleasure principle）之外的过度享乐——它带来痛苦却又令人沉迷。享乐是身体的"过度"和"剩余"。',
    detailedExplanation: `享乐（Jouissance）是拉康后期理论的核心概念。法语 jouissance 有"享乐"、"快感"、"享受到极致"的含义，但拉康赋予了它完全不同的含义。

**快乐原则 vs 享乐**：
- 快乐原则（弗洛伊德）：心理装置倾向于最小化紧张/兴奋
- 享乐（拉康）：超越快乐阈限的"过度"——它带来的不是满足，而是"痛苦中的快感"

**享乐的悖论**：
1. **禁止与诱惑的一体两面**——"禁止"恰恰创造了对享乐的欲望（乱伦禁忌让母亲成为被禁止的对象）
2. **享乐是"多余"的**——它不能为生命服务，而是生命的"浪费"
3. **阉割即享乐的放弃**——进入象征界意味着放弃直接的身体享乐，用语言替代

**享乐与死亡驱力**：拉康认为死亡驱力不是"回归无机状态的冲动"，而是重复地朝向不可能之物的驱力——即享乐。享乐是符号秩序无法驯服的"实在的剩余"。

拉康晚年以"圣状"（Sinthome）概念重新思考享乐——如何"学会与享乐共存"。`,
    field: '精神分析',
    relatedConcepts: ['lacan-reel', 'lacan-petit-a', 'lacan-desir'],
    source: '拉康 研讨班XX《再来》（Encore）',
  },
  {
    id: 'lacan-nom-du-pere',
    name: '父名',
    pinyin: 'fù míng',
    shortDefinition: 'Nom-du-Père，拉康用这一双关语（"父亲之名"与"父亲的禁止"）指代象征界的核心法则——禁止乱伦的法则，打破母子想象性融合的"第三方"。',
    detailedExplanation: `父名（Nom-du-Père / "Non"-du-Père）是拉康最精巧的概念构造之一。

**双关语义**：
- **Nom-du-Père** = "父亲的名字"（象征性功能：命名）
- **"Non"-du-Père** = "父亲的禁止"（禁止乱伦，打破母子二元关系）

**功能**：
1. **阉割性功能**——父名的介入切断了婴儿与母亲的想象性融合，主体由此进入象征界
2. **赋予欲望以法则**——父名不是简单的"禁止"，而是欲望的"法则"：它告诉主体"什么被禁止"的同时也暗示了"什么被允许"
3. **主体的奠基者**——通过接受"父名"，主体获得在象征秩序中的位置（姓氏、系谱、社会位置）

**病理学视角**：
- **精神病（psychose）**——"父名的排斥"（forclusion du Nom-du-Père）：父名被完全拒绝了，象征界与想象界之间出现了"洞"。这是拉康对弗洛伊德"施雷伯案"的重读
- **神经症（névrose）**——"父名的压抑"（refoulement）：父名被接受但被压抑

拉康晚年对父名概念做了根本修正，认为父名只是一个"能指"——是能指链上的一个环节，而非"终极的锚定点"。`,
    field: '精神分析',
    relatedConcepts: ['lacan-symbolique', 'lacan-desir', 'lacan-signifiant'],
    source: '拉康《文集》"关于精神病的任何先导性问题的可能的答复"',
  },
  {
    id: 'lacan-signifiant',
    name: '能指',
    pinyin: 'néng zhǐ',
    shortDefinition: '拉康借用索绪尔的术语但彻底颠覆之：能指优先于所指，语言不是"词语代表事物"，而是能指链的自主滑动。主体由能指决定。',
    detailedExplanation: `能指（Signifiant）是拉康语言化精神分析的基本单元。拉康从索绪尔出发但完全改写了语言学。

**索绪尔 vs 拉康**：
- 索绪尔：所指/能指 = 概念/声音形象，二者如一张纸的两面不可分割
- 拉康：能指优先于所指（S/s），能指不"指向"所指，而是指向另一个能指

**能指的四项原则**：
1. **能指的线性**——能指按时间顺序排列（能指链）
2. **能指的任意性**——能指与所指的关系是任意的
3. **能指的位置性**——能指只在与其他能指的差异中获得意义（红色不是"红"，而是"不是蓝色、绿色……"）
4. **能指的自主性**——能指链自行运作，不受主体的意识控制

**关键命题**：
- "一个能指为主体代表另一个能指"——主体不是语言的使用者，而是被语言"代表"的东西
- "无意识像语言一样结构"——无意识的运作（凝缩=隐喻，移置=换喻）就是能指的运作
- "能指链"——意义不是由一个能指的"内容"决定的，而是由能指之间的"关系"决定的

拉康用S1、S2、S3……表示能指链的主链。主体就是S1和S2之间的"缺口"——在能指之间。`,
    field: '精神分析',
    relatedConcepts: ['lacan-inconscient', 'lacan-sujet-divise', 'lacan-grand-autre'],
    source: '拉康《文集》"功能与领域"（Fonction et champ de la parole et du langage）',
  },
  {
    id: 'lacan-sujet-divise',
    name: '分裂主体',
    pinyin: 'fēn liè zhǔ tí',
    shortDefinition: '主体因"进入语言"而被根本性地分裂——不是两个意识的分裂，而是在"说"与"被说"之间的结构性分裂。主体=能指链上的"缺口"。',
    detailedExplanation: `分裂主体（Sujet divisé / Sujet barré $）是拉康对笛卡尔"我思故我在"的彻底颠覆。

**拉康的"我思"批判**：
笛卡尔：我思→我在（思维实体的统一性）
拉康：我思≠我在——"我在我不思之处，我在我不在之处思"

**分裂的根源**：
1. **语言的分裂**——进入象征界意味着"能指"代表了主体，但一个能指只能为"另一个能指"代表主体。主体永远不能被一个能指"充分"代表
2. **两种主体**——"说话的主体"（sujet de l'énonciation）vs "话语中的主体"（sujet de l'énoncé）：我说"我是……"时，说话的我与话语中的"我"永远不是同一个
3. **人与能指的关系**——人不是"使用"语言，而是被语言"挟持"。人之为主体（subject）恰恰意味着被屈从于（subject to）语言

**公式**：主体 = 能指之间的"缺口"
- S1 → S2（由一个能指向另一个能指滑移）
- 主体"是"S1和S2之间的空隙

**临床意义**：分析的目标不是"恢复主体的完整性"（这不可能），而是让主体"接受自身的分裂"并在分裂中"欲望着"。`,
    field: '精神分析',
    relatedConcepts: ['lacan-inconscient', 'lacan-signifiant', 'lacan-desir', 'lacan-stade-miroir'],
    source: '拉康 研讨班XI《精神分析的四个基本概念》',
  },
]