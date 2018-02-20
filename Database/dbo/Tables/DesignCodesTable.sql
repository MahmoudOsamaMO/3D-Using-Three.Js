CREATE TABLE [dbo].[DesignCodesTable] (
    [DesignCodes_ID] INT            IDENTITY (1, 1) NOT NULL,
    [DesignCodes]    NVARCHAR (150) NULL,
    CONSTRAINT [PK_DesignCodesTable] PRIMARY KEY CLUSTERED ([DesignCodes_ID] ASC)
);

