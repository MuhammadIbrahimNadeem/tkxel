import { Occasion } from '../types/occasion';

export const INITIAL_OCCASIONS: Occasion[] = [
  {
    id: 'occ-uae-national-day',
    name: 'UAE National Day',
    startDate: '2026-12-02',
    audience: 'both',
    country: 'United Arab Emirates',
    region: 'Middle East',
    toneDescription: 'External: formal ministerial diplomatic protocol. Internal: warm, celebratory, and proud for staff.',
    lastUpdated: '2026-11-28T14:32:00Z',
    tracks: {
      external: {
        trackType: 'external',
        status: 'in_review',
        languages: ['en', 'ar'],
        reviewerId: 'sarah-jenkins',
        reviewerName: 'Sarah Jenkins (Director of Comms)',
        reviewHistory: [],
        drafts: {
          en: {
            content: `Your Highnesses, Excellencies, and Esteemed Partners,

On the auspicious occasion of the 55th National Day of the United Arab Emirates, on behalf of the Executive Leadership and our entire global team, we extend our highest congratulations and warmest greetings to the Leadership and people of the UAE.

Over the past five decades, the United Arab Emirates has stood as an extraordinary beacon of innovation, visionary stewardship, and multilateral partnership. We take immense pride in our enduring collaboration and remain deeply committed to contributing to the nation’s visionary economic horizon and sustainable growth.

May this historic milestone bring sustained prosperity, peace, and continued progress to the Emirates.

With highest regards and esteem,

Executive Committee
Global Investment Management Group`,
            lastEditedAt: '2026-11-28T14:32:00Z',
            lastEditedBy: 'Comms AI Agent (Refine diplomatic opening)',
            basedOnVersionId: 'ver-uae-2025-approved',
            basedOnLabel: '2025 approved version — sent Dec 2, 2025',
            basedOnContent: `Your Highnesses, Excellencies, and Esteemed Partners,

On the occasion of the 54th National Day of the United Arab Emirates, we extend our sincere congratulations to the Leadership and people of the UAE.

The United Arab Emirates continues to lead in economic innovation and international partnership. We value our trusted collaboration and look forward to contributing to the nation's ongoing growth.

Wishing the leadership and citizens of the UAE peace and prosperity.

Sincerely,
Executive Committee`,
            history: [
              {
                id: 'ver-uae-2025-approved',
                savedAt: '2025-12-02T09:00:00Z',
                author: 'Sarah Jenkins',
                label: '2025 approved version — sent Dec 2, 2025',
                content: `Your Highnesses, Excellencies, and Esteemed Partners,\n\nOn the occasion of the 54th National Day of the United Arab Emirates, we extend our sincere congratulations to the Leadership and people of the UAE.\n\nThe United Arab Emirates continues to lead in economic innovation and international partnership. We value our trusted collaboration and look forward to contributing to the nation's ongoing growth.\n\nWishing the leadership and citizens of the UAE peace and prosperity.\n\nSincerely,\nExecutive Committee`
              }
            ]
          },
          ar: {
            content: `أصحاب السمو والمعالي والشركاء الكرام،

بمناسبة اليوم الوطني الخامس والخمسين لدولة الإمارات العربية المتحدة، يسرنا بالأصالة عن أنفسنا ونيابة عن جميع أعضاء الإدارة التنفيذية وفريق العمل، أن نرفع أسمى آيات التهاني والتبريكات إلى القيادة الرشيدة وشعب دولة الإمارات العزيز.

لقد سطرت دولة الإمارات نموذجاً استثنائياً في الريادة والابتكار والتنمية المستدامة على مدى العقود الماضية، ونحن نعتز بشراكتنا الراسخة ونتطلع لمواصلة العمل المشترك لدعم مسيرة النمو والازدهار.

دمتم ودامت الإمارات في عزة ورخاء وتقدم مستمر.

وتفضلوا بقبول فائق الاحترام والتقدير،

اللجنة التنفيذية
مجموعة الاستثمار العالمية`,
            lastEditedAt: '2026-11-28T11:45:00Z',
            lastEditedBy: 'Comms AI Agent (Arabic Localizer)',
            basedOnVersionId: 'ver-uae-ar-2025',
            basedOnLabel: '2025 Arabic protocol version',
            basedOnContent: `أصحاب السمو والمعالي، نرفع أسمى آيات التهاني بمناسبة اليوم الوطني لدولة الإمارات العربية المتحدة، متمنين دوام التقدم والازدهار.`,
            history: []
          }
        }
      },
      internal: {
        trackType: 'internal',
        status: 'drafting',
        languages: ['en'],
        reviewerId: 'sarah-jenkins',
        reviewerName: 'Sarah Jenkins (Director of Comms)',
        reviewHistory: [],
        drafts: {
          en: {
            content: `Dear Team,

As we approach UAE National Day on December 2nd, we want to celebrate the remarkable spirit of unity, ambition, and innovation that defines our host nation and our Middle East headquarters.

To our Emirati colleagues and everyone across our regional offices: thank you for your incredible energy, dedication, and contributions. May this holiday bring peaceful moments with family and friends.

Happy 55th UAE National Day!

Warmly,

Executive Leadership`,
            lastEditedAt: '2026-11-27T10:00:00Z',
            lastEditedBy: 'Elena Rostova (Staff Note Draft)',
            basedOnVersionId: 'ver-uae-int-2025',
            basedOnLabel: '2025 internal staff broadcast',
            basedOnContent: `Dear Colleagues,\n\nHappy 54th UAE National Day. Wishing all our regional teams a restful holiday.\n\nWarm regards,\nLeadership Team`,
            history: []
          }
        }
      }
    },
    chatHistory: [
      {
        id: 'msg-1',
        occasionId: 'occ-uae-national-day',
        trackType: 'external',
        role: 'user',
        content: 'Draft our annual UAE National Day letter for external diplomatic partners and ministers. Use our official protocol salutations and reference our commitment to the national vision.',
        timestamp: '2026-11-27T09:14:00Z'
      },
      {
        id: 'msg-2',
        occasionId: 'occ-uae-national-day',
        trackType: 'external',
        role: 'agent',
        content: 'I have prepared the initial English draft honoring the 55th UAE National Day with our standard ministerial protocol salutation and references to sustainable partnership.',
        timestamp: '2026-11-27T09:15:00Z',
        actionType: 'draft_updated'
      }
    ]
  },
  {
    id: 'occ-lunar-new-year',
    name: 'Lunar New Year',
    startDate: '2026-02-17',
    endDate: '2026-02-19',
    audience: 'both',
    country: 'China / East Asia',
    region: 'Asia-Pacific',
    toneDescription: 'External: celebratory & auspicious for partner institutions. Internal: warm & festive for employees.',
    lastUpdated: '2026-02-16T18:00:00Z',
    tracks: {
      external: {
        trackType: 'external',
        status: 'sent',
        languages: ['en', 'zh'],
        reviewerId: 'david-lin',
        reviewerName: 'David Lin (Regional Lead)',
        reviewHistory: [
          {
            id: 'rev-lny-1',
            action: 'approved',
            byUserId: 'david-lin',
            byUserName: 'David Lin',
            comment: 'Approved for external distribution to regional bank partners.',
            timestamp: '2026-02-16T17:45:00Z'
          }
        ],
        drafts: {
          en: {
            content: `Distinguished Partners and Friends,

As we welcome the Year of the Horse, we send our heartfelt greetings and best wishes for a joyful, prosperous, and auspicious Lunar New Year.

The dawn of this new year symbolizes vitality, resilience, and boundless momentum. We are deeply grateful for our valued collaboration and look forward to scaling new heights together in the year ahead.

May the coming year bring you, your esteemed colleagues, and your families good health, boundless happiness, and thriving success.

Warmest wishes,

Global Executive Office`,
            lastEditedAt: '2026-02-16T18:00:00Z',
            lastEditedBy: 'David Lin',
            basedOnVersionId: 'ver-lny-2025',
            basedOnLabel: '2025 Year of the Snake letter',
            basedOnContent: `Distinguished Partners, wishing you a happy Lunar New Year and prosperity in the Year of the Snake.`,
            history: []
          },
          zh: {
            content: `尊敬的合作伙伴与各界朋友：

值此丙午马年新春佳节来临之际，我们谨代表全体管理层与全球团队，向您及贵机构致以最诚挚的新春问候与美好祝愿！

新春伊始，万象更新。马年象征着奋进与活力，我们由衷感谢您长期以来的信任与支持，并期待在未来的岁月中携手并进，共创辉煌。

衷心祝愿您及家人新春快乐，身体健康，事业蒸蒸日上，阖家幸福美满！

全球执行委员会 敬贺`,
            lastEditedAt: '2026-02-16T18:00:00Z',
            lastEditedBy: 'David Lin',
            basedOnVersionId: null,
            history: []
          }
        }
      },
      internal: {
        trackType: 'internal',
        status: 'sent',
        languages: ['en'],
        reviewerId: 'david-lin',
        reviewerName: 'David Lin (Regional Lead)',
        reviewHistory: [],
        drafts: {
          en: {
            content: `Happy Lunar New Year to all our team members and families celebrating across the globe!\n\nWishing everyone health, happiness, and vibrant energy in the Year of the Horse.`,
            lastEditedAt: '2026-02-16T16:00:00Z',
            lastEditedBy: 'David Lin',
            basedOnVersionId: null,
            history: []
          }
        }
      }
    },
    chatHistory: []
  },
  {
    id: 'occ-eid-al-fitr',
    name: 'Eid al-Fitr',
    startDate: '2026-03-20',
    endDate: '2026-03-22',
    audience: 'both',
    country: 'Islamic World / Global',
    region: 'Global',
    toneDescription: 'Warm, spiritual, dignified, and inclusive.',
    lastUpdated: '2026-03-12T16:20:00Z',
    tracks: {
      external: {
        trackType: 'external',
        status: 'drafting',
        languages: ['en', 'ar'],
        reviewerId: 'sarah-jenkins',
        reviewerName: 'Sarah Jenkins (Director of Comms)',
        reviewHistory: [],
        drafts: {
          en: {
            content: `Esteemed Partners, Colleagues, and Friends,

On the joyous occasion of Eid al-Fitr, we extend our warmest greetings and sincere blessings to you, your families, and your communities.

As the holy month of Ramadan draws to a close, Eid brings a sacred moment of reflection, gratitude, unity, and shared fellowship. We celebrate our enduring ties of friendship and wish you days filled with peace, harmony, and joy.

Eid Mubarak to you and your loved ones.

Sincerely,

Executive Leadership Team`,
            lastEditedAt: '2026-03-12T16:20:00Z',
            lastEditedBy: 'Comms AI Agent',
            basedOnVersionId: 'ver-eid-2025',
            basedOnLabel: '2025 Eid al-Fitr approved letter',
            basedOnContent: `Esteemed Partners,\n\nOn the blessed occasion of Eid al-Fitr, we extend our warmest wishes to you and your families for peace, health, and prosperity.\n\nEid Mubarak,\nExecutive Leadership Team`,
            history: []
          },
          ar: {
            content: `حضرات الشركاء والزملاء والأصدقاء الكرام،

بمناسبة حلول عيد الفطر المبارك، يطيب لنا أن نتقدم إليكم وإلى أسركم الكريمة بأصدق التهاني وأطيب التمنيات.

نسأل الله تعالى أن يعيد هذه المناسبة المباركة عليكم وعلى الجميع بالخير واليمن والبركات، وأن ينعم على أوطاننا بالأمن والسلام والازدهار.

عيدكم مبارك وكل عام وأنتم بخير.

مع خالص التحيات والتقدير،
فريق الإدارة التنفيذية`,
            lastEditedAt: '2026-03-12T16:22:00Z',
            lastEditedBy: 'Comms AI Agent',
            basedOnVersionId: null,
            history: []
          }
        }
      },
      internal: {
        trackType: 'internal',
        status: 'drafting',
        languages: ['en'],
        reviewerId: 'sarah-jenkins',
        reviewerName: 'Sarah Jenkins (Director of Comms)',
        reviewHistory: [],
        drafts: {
          en: {
            content: `Dear Colleagues,\n\nWarmest wishes on Eid al-Fitr to all our team members and families celebrating. May this season bring joy, unity, and celebration.\n\nEid Mubarak!`,
            lastEditedAt: '2026-03-12T16:25:00Z',
            lastEditedBy: 'Elena Rostova',
            basedOnVersionId: null,
            history: []
          }
        }
      }
    },
    chatHistory: []
  },
  {
    id: 'occ-singapore-national-day',
    name: 'Singapore National Day',
    startDate: '2026-08-09',
    audience: 'external',
    country: 'Singapore',
    region: 'Asia-Pacific',
    toneDescription: 'Forward-looking, celebrating Singapore’s financial innovation and partnership.',
    lastUpdated: '2026-08-04T15:10:00Z',
    tracks: {
      external: {
        trackType: 'external',
        status: 'in_review',
        languages: ['en', 'zh'],
        reviewerId: 'sarah-jenkins',
        reviewerName: 'Sarah Jenkins (Director of Comms)',
        reviewHistory: [],
        drafts: {
          en: {
            content: `Ministers, Distinguished Partners, and Esteemed Colleagues,

On the 61st National Day of Singapore, we extend our heartfelt congratulations to the Government and the people of Singapore.

Singapore continues to set a global benchmark for economic dynamism, technological governance, and financial excellence. We deeply value our longstanding presence and collaboration across the Lion City.

Wishing the nation continued unity, resilience, and boundless success.

Sincerely,

Executive Leadership`,
            lastEditedAt: '2026-08-04T15:10:00Z',
            lastEditedBy: 'Elena Rostova',
            basedOnVersionId: 'ver-sg-2025',
            basedOnLabel: '2025 Singapore National Day greeting',
            basedOnContent: `Ministers and Esteemed Partners,\n\nCongratulations on Singapore's 60th National Day. We look forward to continuing our strong collaboration.\n\nSincerely,\nExecutive Leadership`,
            history: []
          },
          zh: {
            content: `尊敬的部长、各位合作伙伴与业界同仁：

欣逢新加坡共和国建国61周年国庆之际，我们谨向新加坡政府及全体国民致以最热烈的祝贺！

新加坡始终以卓越的创新力、开放的营商环境与高效的治理引领全球金融体系。我们深感荣幸能在此持续拓展合作。

衷心祝愿新加坡国运昌隆，万象更新！

管理委员会 敬贺`,
            lastEditedAt: '2026-08-04T15:10:00Z',
            lastEditedBy: 'Elena Rostova',
            basedOnVersionId: null,
            history: []
          }
        }
      }
    },
    chatHistory: []
  },
  {
    id: 'occ-korea-liberation',
    name: 'National Liberation Day (Korea)',
    startDate: '2026-08-15',
    audience: 'external',
    country: 'South Korea',
    region: 'East Asia',
    toneDescription: 'Dignified, respectful, commending Korea’s industrial innovation and partnership.',
    lastUpdated: '2026-08-10T12:00:00Z',
    tracks: {
      external: {
        trackType: 'external',
        status: 'in_review',
        languages: ['en', 'ko'],
        reviewerId: 'sarah-jenkins',
        reviewerName: 'Sarah Jenkins (Director of Comms)',
        reviewHistory: [],
        drafts: {
          en: {
            content: `Excellencies and Respected Partners,

On the celebratory occasion of Gwangbokjeol (National Liberation Day of the Republic of Korea), we convey our highest esteem and sincere congratulations to the people of Korea.

We admire Korea’s remarkable economic vitality and transformative leadership in global technology and green transition, and we look forward to deepening our strategic ties.

Respectfully yours,

Global Investment Council`,
            lastEditedAt: '2026-08-10T12:00:00Z',
            lastEditedBy: 'Comms AI Agent',
            basedOnVersionId: 'ver-kr-2025',
            basedOnLabel: '2025 Gwangbokjeol letter',
            basedOnContent: `Excellencies,\n\nWarmest greetings on National Liberation Day of Korea.\n\nRespectfully,\nGlobal Investment Council`,
            history: []
          },
          ko: {
            content: `존경하는 귀하 및 협력사 관계자 여러분,

제81주년 광복절을 맞이하여 대한민국 국민 여러분과 귀 기관에 진심 어린 축하와 경의를 표합니다.

대한민국의 눈부신 경제 발전과 글로벌 기술 혁신을 깊이 존경하며, 앞으로도 상호 신뢰를 바탕으로 더욱 굳건한 협력을 이어 나가기를 기대합니다.

귀국의 무궁한 발전과 번영을 진심으로 기원합니다.

글로벌 투자위원회 배상`,
            lastEditedAt: '2026-08-10T12:00:00Z',
            lastEditedBy: 'Comms AI Agent',
            basedOnVersionId: null,
            history: []
          }
        }
      }
    },
    chatHistory: []
  },
  {
    id: 'occ-saudi-national-day',
    name: 'Saudi National Day',
    startDate: '2026-09-23',
    audience: 'both',
    country: 'Saudi Arabia',
    region: 'Middle East',
    toneDescription: 'Visionary, respectful, celebrating the Kingdom’s transformation under Vision 2030.',
    lastUpdated: '2026-08-25T11:15:00Z',
    tracks: {
      external: {
        trackType: 'external',
        status: 'drafting',
        languages: ['en', 'ar'],
        reviewerId: 'sarah-jenkins',
        reviewerName: 'Sarah Jenkins (Director of Comms)',
        reviewHistory: [],
        drafts: {
          en: {
            content: `Custodian of the Two Holy Mosques, Your Royal Highnesses, Excellencies, and Respected Partners,

On the proud occasion of the 96th National Day of the Kingdom of Saudi Arabia, we convey our warmest congratulations to the Custodian of the Two Holy Mosques, His Royal Highness the Crown Prince, and the noble people of the Kingdom.

We celebrate the extraordinary progress, cultural revitalization, and economic transformation unfolding across the Kingdom under Vision 2030. We remain proud partners in your journey toward a dynamic, prosperous future.

May the Kingdom continue to flourish in peace, strength, and boundless accomplishment.

Highest regards,

Leadership & Executive Council`,
            lastEditedAt: '2026-08-25T11:15:00Z',
            lastEditedBy: 'Comms AI Agent',
            basedOnVersionId: 'ver-ksa-2025',
            basedOnLabel: '2025 95th National Day approved letter',
            basedOnContent: `Custodian of the Two Holy Mosques, Your Royal Highnesses,\n\nCongratulations on Saudi National Day.\n\nSincerely,\nLeadership Council`,
            history: []
          },
          ar: {
            content: `خادم الحرمين الشريفين، سمو ولي العهد الأمين، أصحاب السمو والمعالي والشركاء الكرام،

بمناسبة اليوم الوطني السادس والتسعين للمملكة العربية السعودية، نتشرف بأن نرفع أسمى آيات التهاني والتبريكات إلى مقام خادم الحرمين الشريفين، وإلى سمو ولي عهده الأمين، وإلى الشعب السعودي الكريم.

نعتز بما تشهده المملكة من نهضة تنموية رائدة وتحولات استثنائية في إطار رؤية 2030، ونؤكد فخرنا بالشراكة المستمرة والعمل المشترك لبناء مستقبل زاهر ومستدام.

حفظ الله المملكة وأدام عليها نعمة الأمن والاستقرار والازدهار.

وتفضلوا بقبول فائق التقدير والاحترام،

مجلس الإدارة التنفيذي`,
            lastEditedAt: '2026-08-25T11:15:00Z',
            lastEditedBy: 'Comms AI Agent',
            basedOnVersionId: null,
            history: []
          }
        }
      },
      internal: {
        trackType: 'internal',
        status: 'drafting',
        languages: ['en'],
        reviewerId: 'sarah-jenkins',
        reviewerName: 'Sarah Jenkins (Director of Comms)',
        reviewHistory: [],
        drafts: {
          en: {
            content: `Dear Team,\n\nHappy 96th Saudi National Day to all our team members and partners across Riyadh and the Kingdom!\n\nBest regards,\nExecutive Leadership`,
            lastEditedAt: '2026-08-25T11:20:00Z',
            lastEditedBy: 'Elena Rostova',
            basedOnVersionId: null,
            history: []
          }
        }
      }
    },
    chatHistory: []
  },
  {
    id: 'occ-swiss-national-day',
    name: 'Swiss National Day',
    startDate: '2026-08-01',
    audience: 'external',
    country: 'Switzerland',
    region: 'Europe',
    toneDescription: 'Distinguished, acknowledging centuries of stability, financial governance, and precision.',
    lastUpdated: '2026-07-30T16:00:00Z',
    tracks: {
      external: {
        trackType: 'external',
        status: 'sent',
        languages: ['en', 'fr', 'de'],
        reviewerId: 'sarah-jenkins',
        reviewerName: 'Sarah Jenkins (Director of Comms)',
        reviewHistory: [
          {
            id: 'rev-swiss-1',
            action: 'approved',
            byUserId: 'sarah-jenkins',
            byUserName: 'Sarah Jenkins',
            comment: 'Signed off and sent to Swiss banking partners.',
            timestamp: '2026-07-30T15:50:00Z'
          }
        ],
        drafts: {
          en: {
            content: `Excellencies, Respected Financial Partners, and Friends,\n\nOn Swiss National Day, we convey our warmest congratulations to our esteemed colleagues and partners across the Swiss Confederation.\n\nWe honor Switzerland’s steadfast commitment to financial excellence, neutrality, and world-class innovation.\n\nSincerely,\nExecutive Leadership`,
            lastEditedAt: '2026-07-30T16:00:00Z',
            lastEditedBy: 'Sarah Jenkins',
            basedOnVersionId: 'ver-ch-2025',
            basedOnLabel: '2025 Swiss National Day letter',
            basedOnContent: `Excellencies, warm greetings on Swiss National Day.\n\nSincerely,\nExecutive Leadership`,
            history: []
          }
        }
      }
    },
    chatHistory: []
  },
  {
    id: 'occ-uzbek-independence',
    name: 'Uzbekistan Independence Day',
    startDate: '2026-09-01',
    audience: 'external',
    country: 'Uzbekistan',
    region: 'Central Asia',
    toneDescription: 'Respectful, congratulating on New Uzbekistan economic reforms.',
    lastUpdated: '2026-08-26T14:00:00Z',
    tracks: {
      external: {
        trackType: 'external',
        status: 'drafting',
        languages: ['en', 'uz'],
        reviewerId: 'sarah-jenkins',
        reviewerName: 'Sarah Jenkins (Director of Comms)',
        reviewHistory: [],
        drafts: {
          en: {
            content: `Excellencies, Esteemed Government Partners, and Respected Colleagues,\n\nOn the 35th Independence Day of the Republic of Uzbekistan, we extend our sincere congratulations to the Leadership and people of Uzbekistan.\n\nWe commend Uzbekistan’s visionary economic modernization and dynamic investment reforms.\n\nWarm regards,\nExecutive Committee`,
            lastEditedAt: '2026-08-26T14:00:00Z',
            lastEditedBy: 'Comms AI Agent',
            basedOnVersionId: null,
            history: []
          },
          uz: {
            content: `Muhtaram hamkorlar va qadrli do‘stlar,\n\nO‘zbekiston Respublikasi Mustaqilligining 35 yilligi munosabati bilan samimiy tabriklarimizni izhor etamiz.\n\nHurmat bilan,\nIjroiya qo‘mitasi`,
            lastEditedAt: '2026-08-26T14:00:00Z',
            lastEditedBy: 'Comms AI Agent',
            basedOnVersionId: null,
            history: []
          }
        }
      }
    },
    chatHistory: []
  },
  {
    id: 'occ-bastille-day',
    name: 'Bastille Day (France)',
    startDate: '2026-07-14',
    audience: 'external',
    country: 'France',
    region: 'Europe',
    toneDescription: 'Diplomatic, cultural, highlighting European alliances.',
    lastUpdated: '2026-07-01T08:00:00Z',
    tracks: {
      external: {
        trackType: 'external',
        status: 'not_started',
        languages: ['en', 'fr'],
        reviewerId: 'sarah-jenkins',
        reviewerName: 'Sarah Jenkins (Director of Comms)',
        reviewHistory: [],
        drafts: {
          en: {
            content: `Excellencies, Distinguished Partners, and Friends of the French Republic,\n\nOn this 14th of July, celebrating the National Day of the French Republic, we convey our warmest greetings to the French people and our valued partners.\n\nWith warmest regards,\nExecutive Committee`,
            lastEditedAt: '2026-07-01T08:00:00Z',
            lastEditedBy: 'Archival Seed',
            basedOnVersionId: 'ver-fr-2025',
            basedOnLabel: '2025 14 Juillet greeting',
            basedOnContent: `Excellencies, Happy Bastille Day.\n\nRegards,\nExecutive Committee`,
            history: []
          }
        }
      }
    },
    chatHistory: []
  },
  {
    id: 'occ-womens-day',
    name: "International Women's Day",
    startDate: '2026-03-08',
    audience: 'internal',
    country: 'Global',
    region: 'Global',
    toneDescription: 'Empowering, appreciative, celebrating diversity and equity.',
    lastUpdated: '2026-03-06T14:00:00Z',
    tracks: {
      internal: {
        trackType: 'internal',
        status: 'sent',
        languages: ['en'],
        reviewerId: 'elena-rostova',
        reviewerName: 'Elena Rostova (Comms Lead)',
        reviewHistory: [],
        drafts: {
          en: {
            content: `Dear Team,\n\nToday on International Women's Day, we celebrate the remarkable women across our global offices whose leadership, expertise, and dedication drive our company forward every single day.\n\nThank you for your vision, courage, and daily inspiration.\n\nWith gratitude,\nThe Executive Committee`,
            lastEditedAt: '2026-03-06T14:00:00Z',
            lastEditedBy: 'Elena Rostova',
            basedOnVersionId: null,
            history: []
          }
        }
      }
    },
    chatHistory: []
  }
];
