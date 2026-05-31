import type { Book } from '@/types'

export const libraryBooks: Book[] = [
  {
    id: 'sein-und-zeit',
    title: '存在与时间',
    author: '马丁·海德格尔',
    coverColor: '#4A3728',
    description: '海德格尔的代表作，20世纪存在主义哲学与现象学的奠基之作。书中重新提出了"存在的意义"这一根本问题，通过对"此在"的生存论分析，揭示了时间性作为存在之领会的视域。',
    chapters: [
      { id: 'sz-einleitung', title: '导论', sections: [
        { id: 'sz-einleitung-1', title: '§1 存在问题的必要性、结构和优先地位' },
        { id: 'sz-einleitung-2', title: '§2 存在问题的形式结构' },
        { id: 'sz-einleitung-3', title: '§3 存在问题在存在论上的优先地位' },
        { id: 'sz-einleitung-4', title: '§4 存在问题在存在者层次上的优先地位' },
        { id: 'sz-einleitung-5', title: '§5 此在的存在论分析——诠释学' },
        { id: 'sz-einleitung-6', title: '§6 解构存在论历史的任务' },
        { id: 'sz-einleitung-7', title: '§7 现象学的研究方法' },
        { id: 'sz-einleitung-8', title: '§8 纲要' },
      ]},
      { id: 'sz-1', title: '第一篇 此在的准备性基础分析', sections: [
        { id: 'sz-1-9', title: '§9 此在分析的课题' },
        { id: 'sz-1-12', title: '§12 在世之在' },
        { id: 'sz-1-15', title: '§15 当下上手与现成在手' },
        { id: 'sz-1-25', title: '§25 此在与常人' },
        { id: 'sz-1-27', title: '§27 日常的共在' },
        { id: 'sz-1-35', title: '§35 闲言' },
        { id: 'sz-1-38', title: '§38 沉沦与被抛' },
        { id: 'sz-1-40', title: '§40 畏——此在的一种基本现身情态' },
        { id: 'sz-1-41', title: '§41 烦——此在的存在' },
      ]},
      { id: 'sz-2', title: '第二篇 此在与时间性', sections: [
        { id: 'sz-2-46', title: '§46 死亡问题的存在论性质' },
        { id: 'sz-2-47', title: '§47 他人之死与把握死亡之整体性' },
        { id: 'sz-2-53', title: '§53 本真的向死而在' },
        { id: 'sz-2-54', title: '§54 良知问题的存在论基础' },
        { id: 'sz-2-60', title: '§60 良知作为此在本真存在的见证' },
        { id: 'sz-2-62', title: '§62 决断与本真性' },
        { id: 'sz-2-65', title: '§65 时间性作为烦的存在论意义' },
      ]},
    ],
    source: 'library',
  },
  {
    id: 'kritik',
    title: '纯粹理性批判',
    author: '伊曼努尔·康德',
    coverColor: '#2C3E50',
    description: '康德三大批判之首，西方哲学史上最重要的著作之一。通过对纯粹理性的批判考察，为科学知识的可能性奠基，同时为道德和信仰留下空间。',
    chapters: [
      { id: 'krv-vorrede', title: '第一版序言', sections: [] },
      { id: 'krv-einleitung', title: '导言', sections: [
        { id: 'krv-einleitung-1', title: 'I. 纯粹知识与经验知识的区别' },
        { id: 'krv-einleitung-2', title: 'II. 先天知识' },
        { id: 'krv-einleitung-3', title: 'III. 先验感性论' },
      ]},
      { id: 'krv-aesthetik', title: '先验感性论', sections: [
        { id: 'krv-aesthetik-raum', title: '第一节 空间' },
        { id: 'krv-aesthetik-zeit', title: '第二节 时间' },
      ]},
      { id: 'krv-logik', title: '先验逻辑', sections: [
        { id: 'krv-logik-einleitung', title: '导言 先验逻辑的观念' },
      ]},
      { id: 'krv-analytik', title: '先验分析论', sections: [
        { id: 'krv-analytik-kategorien', title: '范畴表' },
        { id: 'krv-analytik-schematismus', title: '图型法' },
        { id: 'krv-analytik-grundsaetze', title: '纯粹知性原理' },
      ]},
      { id: 'krv-dialektik', title: '先验辩证论', sections: [
        { id: 'krv-dialektik-paralogismen', title: '纯粹理性的谬误推理' },
        { id: 'krv-dialektik-antinomie', title: '纯粹理性的二律背反' },
        { id: 'krv-dialektik-ideal', title: '纯粹理性的理想' },
      ]},
    ],
    source: 'library',
  },
  {
    id: 'also-sprach',
    title: '查拉图斯特拉如是说',
    author: '弗里德里希·尼采',
    coverColor: '#5B2C2C',
    description: '尼采最具代表性的哲学诗篇。借古代波斯先知查拉图斯特拉之口，宣告"上帝已死"，提出"超人"和"永恒轮回"的思想。',
    chapters: [
      { id: 'nz-vorrede', title: '查拉图斯特拉的前言', sections: [
        { id: 'nz-vorrede-1', title: '隐修与下山' },
        { id: 'nz-vorrede-2', title: '走钢丝者' },
        { id: 'nz-vorrede-3', title: '末人' },
      ]},
      { id: 'nz-1', title: '第一部', sections: [
        { id: 'nz-1-drei', title: '三种变形' },
        { id: 'nz-1-lehrstuehle', title: '论道德的讲座' },
        { id: 'nz-1-jenseits', title: '论身后的世界者' },
        { id: 'nz-1-veraechter', title: '论蔑视肉体者' },
        { id: 'nz-1-freud', title: '论欢乐与激情' },
      ]},
      { id: 'nz-2', title: '第二部', sections: [
        { id: 'nz-2-spiegel', title: '在幸福岛上' },
        { id: 'nz-2-mitleidigen', title: '论同情者' },
        { id: 'nz-2-priester', title: '论教士' },
        { id: 'nz-2-erloesung', title: '论解救' },
      ]},
      { id: 'nz-3', title: '第三部', sections: [
        { id: 'nz-3-gesicht', title: '幻影与谜' },
        { id: 'nz-3-gene sung', title: '康复者' },
        { id: 'nz-3-sieben', title: '七印记' },
      ]},
    ],
    source: 'library',
  },
  {
    id: 'phaenomenologie-geistes',
    title: '精神现象学',
    author: '格奥尔格·威廉·弗里德里希·黑格尔',
    coverColor: '#1A3A2A',
    description: '黑格尔哲学的导论和整个体系的缩影。描述了意识从感性确定性到绝对知识的辩证发展历程，提出了主奴辩证法等经典思想。',
    chapters: [
      { id: 'phg-einleitung', title: '导论', sections: [] },
      { id: 'phg-1', title: '意识', sections: [
        { id: 'phg-1-sinnliche', title: '感性确定性' },
        { id: 'phg-1-wahrnehmung', title: '知觉' },
        { id: 'phg-1-verstand', title: '知性' },
      ]},
      { id: 'phg-2', title: '自我意识', sections: [
        { id: 'phg-2-herrschaft', title: '主奴辩证法' },
        { id: 'phg-2-stoa', title: '斯多葛主义' },
        { id: 'phg-2-skeptizismus', title: '怀疑主义' },
        { id: 'phg-2-unglueckliches', title: '苦恼意识' },
      ]},
      { id: 'phg-3', title: '理性', sections: [
        { id: 'phg-3-beobachten', title: '观察的理性' },
        { id: 'phg-3-gesetzgebung', title: '理性的立法' },
      ]},
      { id: 'phg-4', title: '精神', sections: [
        { id: 'phg-4-sittlichkeit', title: '伦理世界' },
        { id: 'phg-4-entfremdung', title: '异化的精神' },
      ]},
    ],
    source: 'library',
  },
  {
    id: 'tractatus',
    title: '逻辑哲学论',
    author: '路德维希·维特根斯坦',
    coverColor: '#3D3A2B',
    description: '维特根斯坦早期代表作，以格言式命题构成。提出"语言图像论"，划定了可说的与不可说的界限——对于不可说的，必须保持沉默。',
    chapters: [
      { id: 'tlp-1', title: '世界——事实的世界', sections: [] },
      { id: 'tlp-2', title: '对象与事态', sections: [] },
      { id: 'tlp-3', title: '思想与命题', sections: [] },
      { id: 'tlp-4', title: '命题的本质', sections: [
        { id: 'tlp-4-001', title: '思想是有意义的命题' },
        { id: 'tlp-4-01', title: '命题是实在的图像' },
      ]},
      { id: 'tlp-5', title: '真值函项', sections: [
        { id: 'tlp-5-6', title: '逻辑形式' },
      ]},
      { id: 'tlp-6', title: '命题的一般形式', sections: [
        { id: 'tlp-6-4', title: '伦理学与神秘之物' },
      ]},
      { id: 'tlp-7', title: '沉默', sections: [] },
    ],
    source: 'library',
  },
  {
    id: 'lacan-ecrits',
    title: '拉康文集',
    author: '雅克·拉康',
    coverColor: '#2A1D3E',
    description: '拉康最重要的文字著作集，收录了1936-1965年间的核心论文。包括《镜像阶段》《功能与领域》《主体的颠覆与欲望的辩证法》等经典文本。这些著作奠定了拉康"结构主义精神分析"的理论基础——用索绪尔语言学和列维-斯特劳斯结构人类学重读弗洛伊德。',
    chapters: [
      { id: 'lacan-e-1', title: '镜像阶段作为精神分析经验中自我功能构成要素', sections: [
        { id: 'lacan-e-1a', title: '镜像阶段的形成' },
        { id: 'lacan-e-1b', title: '自我与想象性误认' },
      ]},
      { id: 'lacan-e-2', title: '功能与领域', sections: [
        { id: 'lacan-e-2a', title: '空话与实话' },
        { id: 'lacan-e-2b', title: '无意识像语言一样结构' },
        { id: 'lacan-e-2c', title: '象征界与语言' },
      ]},
      { id: 'lacan-e-3', title: '主体的颠覆与欲望的辩证法', sections: [
        { id: 'lacan-e-3a', title: '能指的主体' },
        { id: 'lacan-e-3b', title: '欲望的辩证法' },
      ]},
      { id: 'lacan-e-4', title: '关于精神病的任何先导性问题的可能答复', sections: [
        { id: 'lacan-e-4a', title: '父名的排斥' },
        { id: 'lacan-e-4b', title: '精神病与象征界的脱落' },
      ]},
      { id: 'lacan-e-5', title: '阳具象征功能的意义', sections: [
        { id: 'lacan-e-5a', title: '阳具能指' },
        { id: 'lacan-e-5b', title: '阉割与欲望' },
      ]},
    ],
    source: 'library',
  },
  {
    id: 'lacan-seminaire-xi',
    title: '精神分析的四个基本概念',
    author: '雅克·拉康',
    coverColor: '#3E1F2F',
    description: '拉康1964年的研讨班，是他理论生涯中期的巅峰之作。四个基本概念：无意识、重复、移情、驱力。拉康在此对弗洛伊德的"元心理学"进行了系统的结构主义重写，提出了"主体分裂"、"对象a"、"能指链"等核心概念。',
    chapters: [
      { id: 'lacan-xi-1', title: '导论：精神分析与科学', sections: [
        { id: 'lacan-xi-1a', title: '精神分析在科学中的位置' },
        { id: 'lacan-xi-1b', title: '主体与科学话语' },
      ]},
      { id: 'lacan-xi-2', title: '无意识与主体', sections: [
        { id: 'lacan-xi-2a', title: '无意识作为语言的结构' },
        { id: 'lacan-xi-2b', title: '主体与能指' },
        { id: 'lacan-xi-2c', title: '分裂主体' },
      ]},
      { id: 'lacan-xi-3', title: '重复', sections: [
        { id: 'lacan-xi-3a', title: '自动重复' },
        { id: 'lacan-xi-3b', title: '重复与驱力' },
      ]},
      { id: 'lacan-xi-4', title: '移情', sections: [
        { id: 'lacan-xi-4a', title: '移情的本质' },
        { id: 'lacan-xi-4b', title: '分析场景' },
      ]},
      { id: 'lacan-xi-5', title: '驱力', sections: [
        { id: 'lacan-xi-5a', title: '驱力与对象a' },
        { id: 'lacan-xi-5b', title: '性的驱力与死亡驱力' },
      ]},
    ],
    source: 'library',
  },
  {
    id: 'lacan-seminaire-xx',
    title: '再来（研讨班XX）',
    author: '雅克·拉康',
    coverColor: '#4A1A2E',
    description: '拉康1972-1973年的研讨班，是他晚期思想的里程碑。标题"Encore"一语双关——既指"再来"（弗洛伊德的"再来一次"），又暗指"享乐"（jouissance）的无限重复。拉康在此重新思考了性分化、女性享乐、爱情与症状的关系，提出了"不存在性关系"的著名命题。',
    chapters: [
      { id: 'lacan-xx-1', title: '享乐', sections: [
        { id: 'lacan-xx-1a', title: '快乐原则之外' },
        { id: 'lacan-xx-1b', title: '享乐的实在' },
      ]},
      { id: 'lacan-xx-2', title: '知识即享乐', sections: [
        { id: 'lacan-xx-2a', title: '知识的享乐' },
        { id: 'lacan-xx-2b', title: '真理与结构' },
      ]},
      { id: 'lacan-xx-3', title: '不存在性关系', sections: [
        { id: 'lacan-xx-3a', title: '性化的公式' },
        { id: 'lacan-xx-3b', title: '男性享乐与女性享乐' },
      ]},
      { id: 'lacan-xx-4', title: '上帝与女性的享乐', sections: [
        { id: 'lacan-xx-4a', title: '女性享乐的不可言说性' },
        { id: 'lacan-xx-4b', title: '圣人与症状' },
      ]},
      { id: 'lacan-xx-5', title: '爱的公式', sections: [
        { id: 'lacan-xx-5a', title: '爱与大他者' },
        { id: 'lacan-xx-5b', title: '爱的替代与症状' },
      ]},
    ],
    source: 'library',
  },
]