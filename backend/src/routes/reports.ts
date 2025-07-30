import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { WeeklyReportsService } from '../services/reports/weekly-reports.service.js';
import { MonthlyReportsService } from '../services/reports/monthly-reports.service.js';
import { AnnualReportsService } from '../services/reports/annual-reports.service.js';
import {
  ApiResponse,
  WeeklyReportData,
  MonthlyReportData,
  AnnualReportData,
} from '../types/index.js';

interface WeeklyReportQuery {
  year: string;
  week: string;
  locale?: string;
}

interface MonthlyReportQuery {
  year: string;
  month: string;
  locale?: string;
}

interface AnnualReportQuery {
  year: string;
  locale?: string;
}

export async function reportsRoutes(fastify: FastifyInstance) {
  const weeklyReportsService = new WeeklyReportsService();
  const monthlyReportsService = new MonthlyReportsService();
  const annualReportsService = new AnnualReportsService();

  // Weekly Reports Routes

  // GET /weekly - Get weekly report
  fastify.get<{ Querystring: WeeklyReportQuery }>(
    '/weekly',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            year: { type: 'string' },
            week: { type: 'string' },
            locale: { type: 'string' },
          },
          required: ['year', 'week'],
        },
      },
    },
    async (request: FastifyRequest<{ Querystring: WeeklyReportQuery }>, reply: FastifyReply) => {
      try {
        const { year, week, locale = 'en' } = request.query;
        const yearNum = parseInt(year, 10);
        const weekNum = parseInt(week, 10);

        if (isNaN(yearNum) || isNaN(weekNum) || weekNum < 1 || weekNum > 52) {
          return reply.status(400).send({
            success: false,
            error: 'INVALID_PARAMETERS',
            message: 'Invalid year or week parameters. Week must be between 1 and 52.',
          } as ApiResponse<null>);
        }

        const reportData = await weeklyReportsService.generateWeeklyReport(
          yearNum,
          weekNum,
          locale as 'en' | 'ar'
        );

        return reply.send({
          success: true,
          data: reportData,
        } as ApiResponse<WeeklyReportData>);
      } catch (error) {
        fastify.log.error('Error generating weekly report:', error);
        return reply.status(500).send({
          success: false,
          error: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to generate weekly report',
        } as ApiResponse<null>);
      }
    }
  );

  // GET /weekly/periods - Get available weekly periods
  fastify.get('/weekly/periods', async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
      const periods = await weeklyReportsService.getAvailableWeeklyPeriods();

      return reply.send({
        success: true,
        data: periods,
      } as ApiResponse<any>);
    } catch (error) {
      fastify.log.error('Error retrieving weekly periods:', error);
      return reply.status(500).send({
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to retrieve available weekly periods',
      } as ApiResponse<null>);
    }
  });

  // Monthly Reports Routes

  // GET /monthly - Get monthly report
  fastify.get<{ Querystring: MonthlyReportQuery }>(
    '/monthly',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            year: { type: 'string' },
            month: { type: 'string' },
            locale: { type: 'string' },
          },
          required: ['year', 'month'],
        },
      },
    },
    async (request: FastifyRequest<{ Querystring: MonthlyReportQuery }>, reply: FastifyReply) => {
      try {
        const { year, month, locale = 'en' } = request.query;
        const yearNum = parseInt(year, 10);
        const monthNum = parseInt(month, 10);

        if (isNaN(yearNum) || isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
          return reply.status(400).send({
            success: false,
            error: 'INVALID_PARAMETERS',
            message: 'Invalid year or month parameters. Month must be between 1 and 12.',
          } as ApiResponse<null>);
        }

        // Validate locale parameter
        const supportedLocales = ['en', 'ar'];
        const validLocale = supportedLocales.includes(locale) ? (locale as 'en' | 'ar') : 'en';

        const reportData = await monthlyReportsService.generateMonthlyReport(
          yearNum,
          monthNum,
          validLocale
        );

        return reply.send({
          success: true,
          data: reportData,
        } as ApiResponse<MonthlyReportData>);
      } catch (error) {
        fastify.log.error('Error generating monthly report:', error);
        return reply.status(500).send({
          success: false,
          error: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to generate monthly report',
        } as ApiResponse<null>);
      }
    }
  );

  // GET /monthly/periods - Get available monthly periods
  fastify.get('/monthly/periods', async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
      const periods = await monthlyReportsService.getAvailableMonthlyPeriods();

      return reply.send({
        success: true,
        data: periods,
      } as ApiResponse<any>);
    } catch (error) {
      fastify.log.error('Error retrieving monthly periods:', error);
      return reply.status(500).send({
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to retrieve available monthly periods',
      } as ApiResponse<null>);
    }
  });

  // Annual Reports Routes

  // GET /annual - Get annual report
  fastify.get<{ Querystring: AnnualReportQuery }>(
    '/annual',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            year: { type: 'string' },
            locale: { type: 'string' },
          },
          required: ['year'],
        },
      },
    },
    async (request: FastifyRequest<{ Querystring: AnnualReportQuery }>, reply: FastifyReply) => {
      try {
        const { year, locale = 'en' } = request.query;
        const yearNum = parseInt(year, 10);

        if (isNaN(yearNum) || yearNum < 2020 || yearNum > new Date().getFullYear()) {
          return reply.status(400).send({
            success: false,
            error: 'INVALID_PARAMETERS',
            message: `Invalid year parameter. Year must be between 2020 and ${new Date().getFullYear()}.`,
          } as ApiResponse<null>);
        }

        // Validate locale parameter
        const supportedLocales = ['en', 'ar'];
        const validLocale = supportedLocales.includes(locale) ? (locale as 'en' | 'ar') : 'en';

        const reportData = await annualReportsService.generateAnnualReport(yearNum, validLocale);

        return reply.send({
          success: true,
          data: reportData,
        } as ApiResponse<AnnualReportData>);
      } catch (error) {
        fastify.log.error('Error generating annual report:', error);
        return reply.status(500).send({
          success: false,
          error: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to generate annual report',
        } as ApiResponse<null>);
      }
    }
  );

  // GET /annual/periods - Get available annual periods
  fastify.get('/annual/periods', async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
      const periods = await annualReportsService.getAvailableAnnualPeriods();

      return reply.send({
        success: true,
        data: periods,
      } as ApiResponse<any>);
    } catch (error) {
      fastify.log.error('Error retrieving annual periods:', error);
      return reply.status(500).send({
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to retrieve available annual periods',
      } as ApiResponse<null>);
    }
  });
}
