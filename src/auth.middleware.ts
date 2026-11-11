import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    const token = req.headers['auth-user'];


    if (!token) {
      return res.status(401).json({ message: "Token manquant. Accès refusé." });
    }

    try {
      const decoded: any = verify(token, process.env.JWT_SECRET as string);

      if (!decoded.userId) {
        return res.status(401).json({ message: "Token invalide : pas de userId." });
      }

      req.userId = decoded.userId;
      
      next();

    } catch (error: any) {
      
      return res.status(401).json({ 
        message: "Token invalide ou expiré." 
      });
      
    }
  }
}