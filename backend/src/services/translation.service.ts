/**
 * Backend translation service for reports
 * Handles translation of zone names, statuses, and other report text
 */

export type SupportedLocale = 'en' | 'ar';

interface Translations {
  en: Record<string, string>;
  ar: Record<string, string>;
}

export class TranslationService {
  private static readonly zoneTranslations: Translations = {
    en: {
      'Mataf Area': 'Mataf Area',
      'King Abdul Aziz Gate': 'King Abdul Aziz Gate',
      'Safa and Marwa Galleries': 'Safa and Marwa Galleries',
      "Prophet's Gate": "Prophet's Gate",
      'Al-Salam Gate': 'Al-Salam Gate',
      'Maqam Ibrahim Area': 'Maqam Ibrahim Area',
      'System-wide': 'System-wide',
      'Operations Center': 'Operations Center',
      'Operations Control': 'Operations Control',
      Transportation: 'Transportation',
      'Data Analytics': 'Data Analytics',
      'Equipment Management': 'Equipment Management',
      'Environmental Control': 'Environmental Control',
      'IT Systems': 'IT Systems',
      'Energy Recovery': 'Energy Recovery',
    },
    ar: {
      'Mataf Area': 'منطقة المطاف',
      'King Abdul Aziz Gate': 'باب الملك عبد العزيز',
      'Safa and Marwa Galleries': 'معارض الصفا والمروة',
      "Prophet's Gate": 'باب النبي',
      'Al-Salam Gate': 'باب السلام',
      'Maqam Ibrahim Area': 'منطقة مقام إبراهيم',
      'System-wide': 'على مستوى النظام',
      'Operations Center': 'مركز العمليات',
      'Operations Control': 'التحكم في العمليات',
      Transportation: 'النقل',
      'Data Analytics': 'تحليل البيانات',
      'Equipment Management': 'إدارة المعدات',
      'Environmental Control': 'التحكم البيئي',
      'IT Systems': 'أنظمة تقنية المعلومات',
      'Energy Recovery': 'استعادة الطاقة',
    },
  };

  private static readonly statusTranslations: Translations = {
    en: {
      'High Load': 'High Load',
      Normal: 'Normal',
      Optimal: 'Optimal',
      Operational: 'Operational',
      increasing: 'increasing',
      decreasing: 'decreasing',
      stable: 'stable',
      'All Clear': 'All Clear',
      pending: 'pending',
      resolved: 'resolved',
      completed: 'completed',
    },
    ar: {
      'High Load': 'حمولة عالية',
      Normal: 'عادي',
      Optimal: 'أمثل',
      Operational: 'تشغيلي',
      increasing: 'متزايد',
      decreasing: 'متناقص',
      stable: 'مستقر',
      'All Clear': 'كل شيء واضح',
      pending: 'معلق',
      resolved: 'محلول',
      completed: 'مكتمل',
    },
  };

  private static readonly weekTranslations: Translations = {
    en: {
      'Week 1': 'Week 1',
      'Week 2': 'Week 2',
      'Week 3': 'Week 3',
      'Week 4': 'Week 4',
    },
    ar: {
      'Week 1': 'الأسبوع الأول',
      'Week 2': 'الأسبوع الثاني',
      'Week 3': 'الأسبوع الثالث',
      'Week 4': 'الأسبوع الرابع',
    },
  };

  private static readonly monthTranslations: Translations = {
    en: {
      January: 'January',
      February: 'February',
      March: 'March',
      April: 'April',
      May: 'May',
      June: 'June',
      July: 'July',
      August: 'August',
      September: 'September',
      October: 'October',
      November: 'November',
      December: 'December',
    },
    ar: {
      January: 'يناير',
      February: 'فبراير',
      March: 'مارس',
      April: 'أبريل',
      May: 'مايو',
      June: 'يونيو',
      July: 'يوليو',
      August: 'أغسطس',
      September: 'سبتمبر',
      October: 'أكتوبر',
      November: 'نوفمبر',
      December: 'ديسمبر',
    },
  };

  private static readonly sourceTranslations: Translations = {
    en: {
      'organic waste processing': 'organic waste processing',
      'plastic recycling & organic processing': 'plastic recycling & organic processing',
      'reduction through proper waste management': 'reduction through proper waste management',
    },
    ar: {
      'organic waste processing': 'معالجة النفايات العضوية',
      'plastic recycling & organic processing': 'إعادة تدوير البلاستيك ومعالجة العضوي',
      'reduction through proper waste management': 'التقليل من خلال إدارة النفايات السليمة',
    },
  };

  private static readonly systemTranslations: Translations = {
    en: {
      'Al-Haram Waste Management System': 'Al-Haram Waste Management System',
      'Monthly Waste Report': 'Monthly Waste Report',
    },
    ar: {
      'Al-Haram Waste Management System': 'نظام إدارة النفايات بالحرم',
      'Monthly Waste Report': 'التقرير الشهري للنفايات',
    },
  };

  private static readonly metricTranslations: Translations = {
    en: {
      'Plastic Waste': 'Plastic Waste',
      'Organic Waste': 'Organic Waste',
      'System Efficiency': 'System Efficiency',
    },
    ar: {
      'Plastic Waste': 'النفايات البلاستيكية',
      'Organic Waste': 'النفايات العضوية',
      'System Efficiency': 'كفاءة النظام',
    },
  };

  private static readonly recommendationTranslations: Translations = {
    en: {
      'Monitor bin fill levels to optimize collection schedule':
        'Monitor bin fill levels to optimize collection schedule',
      'Regular maintenance of organic and plastic separation systems':
        'Regular maintenance of organic and plastic separation systems',
      'Deploy additional temporary bins during Hajj peak period':
        'Deploy additional temporary bins during Hajj peak period',
      'Increase collection frequency to 3x daily during peak days':
        'Increase collection frequency to 3x daily during peak days',
      'Ensure all 16 bins are operational and properly labeled':
        'Ensure all 16 bins are operational and properly labeled',
      'Coordinate with cleaning crews for immediate overflow response':
        'Coordinate with cleaning crews for immediate overflow response',
      'Increase bin monitoring frequency during peak visitor times':
        'Increase bin monitoring frequency during peak visitor times',
      'Ensure proper segregation of organic and plastic waste':
        'Ensure proper segregation of organic and plastic waste',
      'Schedule additional maintenance checks for high-use bins':
        'Schedule additional maintenance checks for high-use bins',
      'Monitor capacity trends for future planning': 'Monitor capacity trends for future planning',
      'Conduct thorough cleaning and maintenance of all 16 bins':
        'Conduct thorough cleaning and maintenance of all 16 bins',
      'Review and optimize bin placement locations': 'Review and optimize bin placement locations',
      'Train staff on proper waste segregation procedures':
        'Train staff on proper waste segregation procedures',
      'Plan preventive maintenance during low-demand periods':
        'Plan preventive maintenance during low-demand periods',
      'Maintain current operational procedures for 16-bin system':
        'Maintain current operational procedures for 16-bin system',
      'Monitor organic vs plastic waste ratio trends':
        'Monitor organic vs plastic waste ratio trends',
      'Ensure consistent waste segregation quality': 'Ensure consistent waste segregation quality',
      'Regular inspection of bin conditions and signage':
        'Regular inspection of bin conditions and signage',
    },
    ar: {
      'Monitor bin fill levels to optimize collection schedule':
        'مراقبة مستويات امتلاء الحاويات لتحسين جدول الجمع',
      'Regular maintenance of organic and plastic separation systems':
        'الصيانة المنتظمة لأنظمة فصل النفايات العضوية والبلاستيكية',
      'Deploy additional temporary bins during Hajj peak period':
        'نشر حاويات مؤقتة إضافية خلال فترة ذروة الحج',
      'Increase collection frequency to 3x daily during peak days':
        'زيادة تكرار الجمع إلى 3 مرات يومياً خلال أيام الذروة',
      'Ensure all 16 bins are operational and properly labeled':
        'التأكد من تشغيل جميع الحاويات الـ16 ووضع العلامات المناسبة',
      'Coordinate with cleaning crews for immediate overflow response':
        'التنسيق مع أطقم التنظيف للاستجابة الفورية للفيض',
      'Increase bin monitoring frequency during peak visitor times':
        'زيادة تكرار مراقبة الحاويات خلال أوقات ذروة الزوار',
      'Ensure proper segregation of organic and plastic waste':
        'ضمان الفصل المناسب للنفايات العضوية والبلاستيكية',
      'Schedule additional maintenance checks for high-use bins':
        'جدولة فحوصات صيانة إضافية للحاويات عالية الاستخدام',
      'Monitor capacity trends for future planning': 'مراقبة اتجاهات السعة للتخطيط المستقبلي',
      'Conduct thorough cleaning and maintenance of all 16 bins':
        'إجراء تنظيف وصيانة شاملة لجميع الحاويات الـ16',
      'Review and optimize bin placement locations': 'مراجعة وتحسين مواقع وضع الحاويات',
      'Train staff on proper waste segregation procedures':
        'تدريب الموظفين على إجراءات فصل النفايات المناسبة',
      'Plan preventive maintenance during low-demand periods':
        'التخطيط للصيانة الوقائية خلال فترات الطلب المنخفض',
      'Maintain current operational procedures for 16-bin system':
        'الحفاظ على الإجراءات التشغيلية الحالية لنظام الـ16 حاوية',
      'Monitor organic vs plastic waste ratio trends':
        'مراقبة اتجاهات نسبة النفايات العضوية مقابل البلاستيكية',
      'Ensure consistent waste segregation quality': 'ضمان جودة فصل النفايات المتسقة',
      'Regular inspection of bin conditions and signage': 'الفحص المنتظم لأحوال الحاويات واللافتات',
    },
  };

  private static readonly comparisonTranslations: Translations = {
    en: {
      'Total Waste': 'Total Waste',
      'Increased pilgrimage activity': 'Increased pilgrimage activity',
      'Decreased activity or improved efficiency': 'Decreased activity or improved efficiency',
      'Normal operational variation': 'Normal operational variation',
    },
    ar: {
      'Total Waste': 'إجمالي النفايات',
      'Increased pilgrimage activity': 'زيادة نشاط الحج والعمرة',
      'Decreased activity or improved efficiency': 'انخفاض النشاط أو تحسن الكفاءة',
      'Normal operational variation': 'تغيير تشغيلي عادي',
    },
  };

  private static readonly alertTranslations: Translations = {
    en: {
      'successful waste collections completed': 'successful waste collections completed',
      'Bin capacity at 95% - collection priority required':
        'Bin capacity at 95% - collection priority required',
      'Additional collection crews deployed for high-volume period':
        'Additional collection crews deployed for high-volume period',
      'Emergency grinder unit activated for increased plastic load':
        'Emergency grinder unit activated for increased plastic load',
      'Overflow sensors detected - immediate attention required':
        'Overflow sensors detected - immediate attention required',
      '24/7 collection schedule implemented during Hajj period':
        '24/7 collection schedule implemented during Hajj period',
      'Iftar waste surge managed - extra bins deployed':
        'Iftar waste surge managed - extra bins deployed',
      'Night shift collection teams increased for Taraweeh period':
        'Night shift collection teams increased for Taraweeh period',
      'Unusual increase': 'Unusual increase',
      'Unusual decrease': 'Unusual decrease',
      'detected - monitoring closely': 'detected - monitoring closely',
      increase: 'increase',
      decrease: 'decrease',
      'Scheduled maintenance on waste compactors completed':
        'Scheduled maintenance on waste compactors completed',
      'Weekly sensor calibration and cleaning completed':
        'Weekly sensor calibration and cleaning completed',
      'Enhanced odor control systems activated for summer period':
        'Enhanced odor control systems activated for summer period',
      'IoT sensor network optimization completed': 'IoT sensor network optimization completed',
      'High energy recovery': 'High energy recovery',
      'kWh generated from organic waste': 'kWh generated from organic waste',
      'System operating at maximum capacity - emergency protocols activated':
        'System operating at maximum capacity - emergency protocols activated',
    },
    ar: {
      'successful waste collections completed': 'تم إنجاز عمليات جمع النفايات بنجاح',
      'Bin capacity at 95% - collection priority required': 'سعة الحاوية 95% - مطلوب أولوية الجمع',
      'Additional collection crews deployed for high-volume period':
        'تم نشر أطقم جمع إضافية لفترة الحجم العالي',
      'Emergency grinder unit activated for increased plastic load':
        'تم تشغيل وحدة الطحن الطارئة للحمولة البلاستيكية المتزايدة',
      'Overflow sensors detected - immediate attention required':
        'تم اكتشاف أجهزة استشعار الفيض - مطلوب انتباه فوري',
      '24/7 collection schedule implemented during Hajj period':
        'تم تنفيذ جدول جمع على مدار 24/7 خلال فترة الحج',
      'Iftar waste surge managed - extra bins deployed':
        'تم إدارة زيادة نفايات الإفطار - تم نشر حاويات إضافية',
      'Night shift collection teams increased for Taraweeh period':
        'تم زيادة فرق جمع الورديات الليلية لفترة التراويح',
      'Unusual increase': 'زيادة غير عادية',
      'Unusual decrease': 'انخفاض غير عادي',
      'detected - monitoring closely': 'تم اكتشافها - مراقبة دقيقة',
      increase: 'زيادة',
      decrease: 'انخفاض',
      'Scheduled maintenance on waste compactors completed':
        'تم إنجاز الصيانة المجدولة على ضواغط النفايات',
      'Weekly sensor calibration and cleaning completed':
        'تم إنجاز المعايرة والتنظيف الأسبوعي للمستشعرات',
      'Enhanced odor control systems activated for summer period':
        'تم تشغيل أنظمة التحكم في الرائحة المحسنة لفترة الصيف',
      'IoT sensor network optimization completed': 'تم إنجاز تحسين شبكة مستشعرات إنترنت الأشياء',
      'High energy recovery': 'استعادة طاقة عالية',
      'kWh generated from organic waste': 'كيلووات ساعة تم توليدها من النفايات العضوية',
      'System operating at maximum capacity - emergency protocols activated':
        'النظام يعمل بأقصى سعة - تم تفعيل البروتوكولات الطارئة',
    },
  };

  private static readonly annualReportTranslations: Translations = {
    en: {
      'Annual Waste Report – 2024': 'Annual Waste Report – 2024',
      'Al-Haram Waste Management System': 'Al-Haram Waste Management System',
      Ramadan: 'Ramadan',
      Jan: 'Jan',
      Feb: 'Feb',
      Mar: 'Mar',
      Apr: 'Apr',
      May: 'May',
      Jun: 'Jun',
      Jul: 'Jul',
      Aug: 'Aug',
      Sep: 'Sep',
      Oct: 'Oct',
      Nov: 'Nov',
      Dec: 'Dec',
      Q1: 'Q1',
      Q2: 'Q2',
      Q3: 'Q3',
      Q4: 'Q4',
      kg: 'kg',
      '%': '%',
      USD: 'USD',
      kWh: 'kWh',
      tons: 'tons',
      MWh: 'MWh',
      'tons CO2': 'tons CO2',
      'tons diverted': 'tons diverted',
      households: 'households',
      'Grinder Maintenance': 'Grinder Maintenance',
      'Sensor Calibration': 'Sensor Calibration',
      'Pneumatic Systems': 'Pneumatic Systems',
      'Electrical Systems': 'Electrical Systems',
      'Cleaning & Servicing': 'Cleaning & Servicing',
      'Invest in additional organic waste processing capacity to handle 20% growth projected for 2025':
        'Invest in additional organic waste processing capacity to handle 20% growth projected for 2025',
      'Implement AI-powered predictive maintenance to reduce emergency repairs by 40%':
        'Implement AI-powered predictive maintenance to reduce emergency repairs by 40%',
      'Expand plastic recycling partnerships to increase revenue by $15,000 annually':
        'Expand plastic recycling partnerships to increase revenue by $15,000 annually',
      'Install additional bins in Mataf Area to manage consistently high waste volumes':
        'Install additional bins in Mataf Area to manage consistently high waste volumes',
      'Develop seasonal adjustment protocols for Ramadan and Hajj periods':
        'Develop seasonal adjustment protocols for Ramadan and Hajj periods',
      'Consider upgrading to next-generation grinder systems for improved efficiency':
        'Consider upgrading to next-generation grinder systems for improved efficiency',
      'Establish carbon credit program to monetize environmental impact':
        'Establish carbon credit program to monetize environmental impact',
      'Implement real-time analytics dashboard for proactive system management':
        'Implement real-time analytics dashboard for proactive system management',
    },
    ar: {
      'Annual Waste Report – 2024': 'التقرير السنوي للنفايات – 2024',
      'Al-Haram Waste Management System': 'نظام إدارة النفايات بالحرم',
      Ramadan: 'رمضان',
      Jan: 'يناير',
      Feb: 'فبراير',
      Mar: 'مارس',
      Apr: 'أبريل',
      May: 'مايو',
      Jun: 'يونيو',
      Jul: 'يوليو',
      Aug: 'أغسطس',
      Sep: 'سبتمبر',
      Oct: 'أكتوبر',
      Nov: 'نوفمبر',
      Dec: 'ديسمبر',
      Q1: 'الربع الأول',
      Q2: 'الربع الثاني',
      Q3: 'الربع الثالث',
      Q4: 'الربع الرابع',
      kg: 'كجم',
      '%': '%',
      USD: 'دولار أمريكي',
      kWh: 'كيلووات ساعة',
      tons: 'طن',
      MWh: 'ميجاوات ساعة',
      'tons CO2': 'طن CO2',
      'tons diverted': 'طن محول',
      households: 'منزل',
      'Grinder Maintenance': 'صيانة المطاحن',
      'Sensor Calibration': 'معايرة المستشعرات',
      'Pneumatic Systems': 'الأنظمة الهوائية',
      'Electrical Systems': 'الأنظمة الكهربائية',
      'Cleaning & Servicing': 'التنظيف والخدمة',
      'Invest in additional organic waste processing capacity to handle 20% growth projected for 2025':
        'الاستثمار في قدرة إضافية لمعالجة النفايات العضوية للتعامل مع النمو المتوقع 20% لعام 2025',
      'Implement AI-powered predictive maintenance to reduce emergency repairs by 40%':
        'تنفيذ الصيانة التنبؤية المدعومة بالذكاء الاصطناعي لتقليل الإصلاحات الطارئة بنسبة 40%',
      'Expand plastic recycling partnerships to increase revenue by $15,000 annually':
        'توسيع شراكات إعادة تدوير البلاستيك لزيادة الإيرادات بـ 15,000 دولار سنوياً',
      'Install additional bins in Mataf Area to manage consistently high waste volumes':
        'تركيب حاويات إضافية في منطقة المطاف لإدارة كميات النفايات العالية باستمرار',
      'Develop seasonal adjustment protocols for Ramadan and Hajj periods':
        'تطوير بروتوكولات التعديل الموسمي لفترات رمضان والحج',
      'Consider upgrading to next-generation grinder systems for improved efficiency':
        'النظر في الترقية إلى أنظمة الطحن من الجيل التالي لتحسين الكفاءة',
      'Establish carbon credit program to monetize environmental impact':
        'إنشاء برنامج ائتمان الكربون لاستثمار التأثير البيئي',
      'Implement real-time analytics dashboard for proactive system management':
        'تنفيذ لوحة تحليلات في الوقت الفعلي لإدارة النظام الاستباقية',
    },
  };

  /**
   * Translate zone name based on locale
   */
  public static translateZone(zoneName: string, locale: SupportedLocale): string {
    return this.zoneTranslations[locale][zoneName] || zoneName;
  }

  /**
   * Translate status based on locale
   */
  public static translateStatus(status: string, locale: SupportedLocale): string {
    return this.statusTranslations[locale][status] || status;
  }

  /**
   * Translate week name based on locale
   */
  public static translateWeek(week: string, locale: SupportedLocale): string {
    return this.weekTranslations[locale][week] || week;
  }

  /**
   * Translate month name based on locale
   */
  public static translateMonth(month: string, locale: SupportedLocale): string {
    return this.monthTranslations[locale][month] || month;
  }

  /**
   * Translate source text based on locale
   */
  public static translateSource(source: string, locale: SupportedLocale): string {
    return this.sourceTranslations[locale][source] || source;
  }

  /**
   * Translate system text based on locale
   */
  public static translateSystem(text: string, locale: SupportedLocale): string {
    return this.systemTranslations[locale][text] || text;
  }

  /**
   * Translate metric name based on locale
   */
  public static translateMetric(metric: string, locale: SupportedLocale): string {
    return this.metricTranslations[locale][metric] || metric;
  }

  /**
   * Translate recommendation text based on locale
   */
  public static translateRecommendation(recommendation: string, locale: SupportedLocale): string {
    return this.recommendationTranslations[locale][recommendation] || recommendation;
  }

  /**
   * Translate comparison text based on locale
   */
  public static translateComparison(text: string, locale: SupportedLocale): string {
    return this.comparisonTranslations[locale][text] || text;
  }

  /**
   * Translate alert message based on locale
   */
  public static translateAlert(message: string, locale: SupportedLocale): string {
    return this.alertTranslations[locale][message] || message;
  }

  /**
   * Translate annual report text based on locale
   */
  public static translateAnnualReport(text: string, locale: SupportedLocale): string {
    return this.annualReportTranslations[locale][text] || text;
  }

  /**
   * Get localized date format
   */
  public static getLocalizedDate(date: Date, locale: SupportedLocale): string {
    if (locale === 'ar') {
      return date.toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
